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
import SidebarMenu from "./SidebarMenu";

/**
 * Dashboard component that renders all ticker data
 */
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

    this.getFirstTrades(book);
    this.getFirstOrders(book);
    this.getChartJSON(this.state.timeframe);

    this.websocket.onopen = e => {
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

      if (data.type === "diff-orders" && data.payload) {
        // console.log(
        //   "%cdiff-orders " + data.book,
        //   "background: #222; color: #bada55"
        // );
        // console.log(data.payload);
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
          // const lastBuy = _.find(trades, ["maker_side", "buy"]).price;
          // const lastSell = _.find(trades, ["maker_side", "sell"]).price;
          this.setState({ trades });
        }
      }
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  /**
   * Function for get first last orders charge.
   */
  getFirstOrders = async book => {
    let value = 0;
    let amount = 0;
    let price = 0;
    let orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book, aggregate: true }
    });

    orders.data.payload.asks = _.map(orders.data.payload.asks, order => {
      price = +order.price;
      value = +order.amount * price;
      amount = +order.amount;
      if (!order.oid)
        return _.assign(order, { oid: uuid(), value, amount, price });
    });
    orders.data.payload.bids = _.map(orders.data.payload.bids, order => {
      price = +order.price;
      value = +order.amount * price;
      amount = +order.amount;
      if (!order.oid)
        return _.assign(order, { oid: uuid(), value, amount, price });
    });
    this.setState({ firstOrders: orders });
  };

  /**
   * Function for get first last trades charge.
   * @param {string} book ticker for get data
   */
  getFirstTrades = async book => {
    const firstTrades = await axios.get("https://api.bitso.com/v3/trades/", {
      params: { book, sort: "desc", limit: 50 }
    });
    // const lastBuy = _.find(firstTrades.data.payload, ["maker_side", "buy"])
    //   .price;
    // const lastSell = _.find(firstTrades.data.payload, ["maker_side", "sell"])
    //   .price;
    this.setState({ firstTrades: firstTrades.data.payload });
  };

  /**
   * Function for get trade data for chandles chart.
   * @param {string} timeframe 1month, 3months or 1year data.
   */
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

  /**
   * Function for toggle chart type.
   */
  toggleChart = () => {
    this.setState({
      currentChart: this.state.currentChart === "candles" ? "deep" : "candles"
    });
  };

  /**
   * Function for change timeframe to get new data.
   */
  onChangeTimeframe = timeframe => {
    this.setState({
      timeframe
    });
    this.getChartJSON(timeframe);
  };

  /**
   * Function for set isFistChartRender state to false.
   */
  handleFirstChartRender = () => {
    this.setState({ isFirstChartRender: false });
  };

  render() {
    const { book, match, onSelectBook } = this.props;
    const { book: paramsBook } = match.params;
    const {
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

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div className="div_block__container">
          <div className="div-block__container-subheader">
            <Subheader
              book={paramsBook || book}
              onSelectBook={book => onSelectBook(book)}
            />
          </div>
        </div>
        <div className="dashboard-container">
          <Trades book={paramsBook || book} trades={trades || firstTrades} />
          <div className="dashboard-content">
            <div className="dashboard-wrapper">
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
            <Orders book={paramsBook || book} orders={orders || firstOrders} />
          </div>
          <SidebarMenu />
        </div>
      </div>
    );
  }
}

export default Dashboard;
