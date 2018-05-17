import React from "react";
import moment from "moment";
import axios from "axios";
import _ from "lodash";
import uuid from "uuid";

import Trades from "./Trades";
import Orders from "./Orders";
import Charts from "./Charts";
import Subheader from "./Subheader";
import OrderData from "../Modules/OrderData";

class Dashboard extends React.Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    loading: true,
    orders: null,
    trades: null,
    firstOrders: null,
    firstTrades: null
  };

  componentDidMount() {
    console.log("%cDID MOUNT DASHBOARD", "background: white; color: black");
    const { book } = this.props.match.params;
    console.log(book);

    this.getFirstOrders(book);
    this.getFirstTrades(book);

    this.websocket.onopen = e => {
      console.log("connected", book);
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book,
          type: "trades"
        })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book,
          type: "diff-orders"
        })
      );
    };

    this.websocket.onmessage = message => {
      var data = JSON.parse(message.data);
      if (data.type === "diff-orders" && data.payload) {
        console.log(
          "%cdiff-orders " + data.book,
          "background: #222; color: #bada55"
        );
        console.log(data.payload);
        if (!_.isEmpty(this.state.firstOrders)) {
          const orderedOrders = OrderData(this.state.firstOrders, data);
          setTimeout(this.setState({ orders: orderedOrders }), 100);
        }
      } else if (data.type === "trades" && data.payload) {
        const trades = this.state.firstTrades;
        console.log("%ctrades " + data.book, "background: #222; color: red");
        console.log(data.payload);
        const { a, i, r, t } = data.payload[0];
        const trade = {
          book,
          created_at: moment().toISOString(),
          amount: a,
          maker_side: t === 0 ? "buy" : "sell",
          price: r,
          tid: i
        };
        trades.unshift(trade);
        this.setState({ trades });
      }
      this.setState({ loading: false });
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  getFirstOrders = async book => {
    let value = 0;
    let orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book, aggregate: true }
    });

    orders.data.payload.asks = _.map(orders.data.payload.asks, order => {
      value = order.amount * order.price;
      if (!order.oid) return _.assign(order, { oid: uuid(), value });
    });
    orders.data.payload.bids = _.map(orders.data.payload.bids, order => {
      value = order.amount * order.price;
      if (!order.oid) return _.assign(order, { oid: uuid(), value });
    });
    this.setState({ firstOrders: orders });
  };

  getFirstTrades = async book => {
    const firstTrades = await axios.get("https://api.bitso.com/v3/trades/", {
      params: { book, sort: "desc", limit: 50 }
    });
    this.setState({ firstTrades: firstTrades.data.payload });
  };

  render() {
    const { book, match, onSelectBook } = this.props;
    const { book: paramsBook } = match.params;
    const { loading, orders, trades, firstTrades } = this.state;

    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="div_block__container">
          <div className="div-block__container-subheader">
            <Subheader
              book={paramsBook || book}
              onSelectBook={book => onSelectBook(book)}
            />
          </div>
        </div>
        <div className="dashboard-container">
          <Trades book={book} trades={trades || firstTrades} />
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              paddingLeft: "1rem"
            }}
          >
            <Charts book={book} orders={orders} />
            <Orders book={book} orders={orders} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
