import React, { Component } from "react";
import axios from "axios";
import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";

import Trades from "./Components/Trades";
import ExchangeContext from "./Contexts/ExchangeContext";
import Orders from "./Components/Orders";
import OrderData from "./Modules/OrderData";
import Charts from "./Components/Charts";

class App extends Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    book: "btc_mxn",
    ticker: {},
    books: null,
    tempOrders: null,
    orders: null,
    trades: null,
    loading: true
  };

  componentDidMount() {
    this.getOrders();
    this.websocket.onopen = () => {
      this.websocket.send(
        JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "trades" })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book: "btc_mxn",
          type: "diff-orders"
        })
      );
      this.websocket.send(
        JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "orders" })
      );
    };
    this.websocket.onmessage = async message => {
      var data = JSON.parse(message.data);
      if (data.type === "trades" && data.payload) {
      } else if (data.type === "diff-orders" && data.payload) {
        const orderedOrders = await OrderData(this.state.tempOrders, data);
        console.log(orderedOrders);
        this.setState({ orders: orderedOrders });
      } else if (data.type === "orders" && data.payload) {
      }
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  getOrders = async () => {
    const orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book: "btc_mxn", aggregate: true }
    });

    this.setState({ tempOrders: orders });
  };

  render() {
    const { book } = this.state;
    return (
      <ExchangeContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={bitso_logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bitso Exchange</h1>
          </header>
          <div style={{ display: "flex", width: "90em", margin: "auto" }}>
            <Trades />
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <Charts book={book} />
              <Orders />
            </div>
          </div>
        </div>
      </ExchangeContext.Provider>
    );
  }
}

export default App;
