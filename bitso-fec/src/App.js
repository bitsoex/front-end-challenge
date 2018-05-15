import React, { Component } from "react";
import axios from "axios";
import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";

import Trades from "./Components/Trades";
import ExchangeContext from "./Contexts/ExchangeContext";
import Orders from "./Components/Orders";
import OrderData from "./Modules/OrderData";
import Charts from "./Components/Charts";
import { parseChartData } from "./Utils";

const websocket = new WebSocket("wss://ws.bitso.com");

websocket.onopen = function() {
  websocket.send(
    JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "trades" })
  );
  websocket.send(
    JSON.stringify({
      action: "subscribe",
      book: "btc_mxn",
      type: "diff-orders"
    })
  );
  websocket.send(
    JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "orders" })
  );
};

class App extends Component {
  state = {
    book: "btc_mxn",
    ticker: {},
    books: null,
    orders: null,
    trades: null,
    timeframe: "1month",
    candleData: null,
    volumeData: null,
    loading: true
  };

  async componentDidMount() {
    const orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book: "btc_mxn", aggregate: true }
    });
    websocket.onmessage = message => {
      var data = JSON.parse(message.data);
      if (data.type === "trades" && data.payload) {
      } else if (data.type === "diff-orders" && data.payload) {
        // orders.data.payload
        const orderedOrders = OrderData(orders, data);
        this.setState({ orders: orderedOrders });
      } else if (data.type === "orders" && data.payload) {
      }
    };
    this.getChartJSON();
  }

  getChartJSON = async () => {
    const { book, timeframe } = this.state;
    try {
      const { data, status } = await axios.get(
        `https://bitso.com/trade/chartJSON/${book}/${timeframe}`
      );
      if (status === 200) {
        this.setState({ ...parseChartData(data) });
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div>Cargando...</div>;
    }
    return (
      <ExchangeContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={bitso_logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bitso Exchange</h1>
          </header>
          <div>
            <Trades />
            <div>
              <Charts />
              <Orders />
            </div>
          </div>
        </div>
      </ExchangeContext.Provider>
    );
  }
}

export default App;
