import React from "react";
import axios from "axios";
import _ from "lodash";
import uuid from "uuid";
import moment from "moment";
import Trades from "./Trades";
import Orders from "./Orders";
import Charts from "./Charts";
import OrderData from "../Modules/OrderData";

class Dashboard extends React.Component {
  state = {
    orders: null,
    trades: null
  };

  getFirstOrders = async () => {
    let orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book: "btc_mxn", aggregate: true }
    });
    orders.data.payload.asks = _.map(orders.data.payload.asks, order => {
      if (!order.oid) return _.assign(order, { oid: uuid() });
    });
    orders.data.payload.bids = _.map(orders.data.payload.bids, order => {
      if (!order.oid) return _.assign(order, { oid: uuid() });
    });
    return orders;
  };

  getFirstTrades = async () => {
    const firstTrades = await axios.get("https://api.bitso.com/v3/trades/", {
      params: { book: "btc_mxn", sort: "desc", limit: 50 }
    });
    return firstTrades.data.payload;
  };


  async componentDidMount() {
    const { websocket, book } = this.props;
    const firstOrders = await this.getFirstOrders();
    const firstTrades = await this.getFirstTrades();
    this.setState({ trades: firstTrades });

    websocket.onmessage = message => {
      var data = JSON.parse(message.data);
      if (data.type === "diff-orders" && data.payload) {
        const orderedOrders = OrderData(firstOrders, data);
        this.setState({ orders: orderedOrders });
      } else if (data.type === "trades" && data.payload) {
        const trades = this.state.trades;
        const { a, i, r, t } = data.payload[0];
        const trade = {
          book,
          created_at: moment().toString(),
          amount: a,
          maker_side: t === 0 ? "buy" : "sell",
          price: r,
          tid: i
        };
        trades.unshift(trade);
        this.setState({ trade });
      }
    };
  }

  render() {
    const { book } = this.props;
    const { orders, trades } = this.state;
    return (
      <div style={{ display: "flex", width: "90em", margin: "auto" }}>
        <Trades book={book} trades={trades} />
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Charts book={book} />
          <Orders book={book} orders={orders} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
