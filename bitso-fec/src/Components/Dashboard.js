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
import ChartBar from "./ChartBar";

import { parseChartData } from "../Utils";

class Dashboard extends React.Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    loading: true,
    orders: null,
    trades: null,
    firstOrders: null,
    firstTrades: null,
    candleData: null,
    volumeData: null,
    isFirstChartRender: true,
    timeframe: "1month",
    currentChart: "candles" // candles or deep
  };

  componentDidMount() {
    console.log("%cDID MOUNT DASHBOARD", "background: white; color: black");
    const { book } = this.props.match.params;
    console.log(book);

    this.getFirstOrders(book);
    this.getFirstTrades(book);
    this.getChartJSON(this.state.timeframe);

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
      const { book: paramsBook } = this.props.match.params;
      var data = JSON.parse(message.data);

      // this.setState({ loading: false });
      if (data.type === "diff-orders" && data.payload) {
        console.log(
          "%cdiff-orders " + data.book,
          "background: #222; color: #bada55"
        );
        console.log(data.payload);
        if (!_.isEmpty(this.state.firstOrders)) {
          const orderedOrders = OrderData(
            this.state.firstOrders,
            data,
            paramsBook || book
          );
          setTimeout(this.setState({ orders: orderedOrders }), 500);
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
        if (trades && trades.length) {
          trades.unshift(trade);
          this.setState({ trades });
        }
      }
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

  getChartJSON = async timeframe => {
    const { book } = this.props;
    try {
      const { data, status } = await axios.get(
        `https://bitso.com/trade/chartJSON/${book}/${timeframe}`
      );
      if (status === 200) {
        this.setState({ ...parseChartData(data), loading: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  toggleChart = () => {
    this.setState({
      currentChart: this.state.currentChart === "candles" ? "deep" : "candles"
    });
  };

  onChangeTimeframe = timeframe => {
    this.setState({
      timeframe
    });
    this.getChartJSON(timeframe);
  };

  handleFirstChartRender = () => {
    this.setState({ isFirstChartRender: false });
  };

  render() {
    const { book, match, onSelectBook } = this.props;
    const { book: paramsBook } = match.params;
    const {
      loading,
      orders,
      trades,
      firstTrades,
      firstOrders,
      currentChart,
      timeframe,
      volumeData,
      candleData,
      isFirstChartRender
    } = this.state;

    // if (loading || _.isEmpty(orders)) {
    //   return <div>Cargando...</div>;
    // }

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
        {loading || _.isEmpty(orders) ? (
          <div>Cargando...</div>
        ) : (
          <div className="dashboard-container">
            <Trades book={paramsBook || book} trades={trades || firstTrades} />
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                paddingLeft: "1rem"
              }}
            >
              <div style={{ flex: 1, minWidth: "70rem" }}>
                <ChartBar
                  currentChart={currentChart}
                  timeframe={timeframe}
                  toggleChart={this.toggleChart}
                  onChangeTimeframe={this.onChangeTimeframe}
                />
                <Charts
                  isFirstChartRender={isFirstChartRender}
                  handleFirstRender={this.handleFirstChartRender}
                  book={paramsBook || book}
                  orders={orders}
                  currentChart={currentChart}
                  volumeData={volumeData}
                  candleData={candleData}
                  timeframe={timeframe}
                />
              </div>
              <Orders
                book={paramsBook || book}
                orders={orders || firstOrders}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
