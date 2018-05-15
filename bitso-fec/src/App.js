import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Orders from "./Components/Orders";
import OrderData from "./Modules/OrderData";
import ExchangeContext from "./Context/ExchangeContext";

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
  constructor() {
    super();
    this.state = {
      book: "btc_mxn",
      trades: null,
      orders: null
    };
  }

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
  }
  render() {
    // console.log(process.env.REACT_APP_API_KEY);
    return (
      <ExchangeContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div className="orders-view">
            <Orders />
          </div>
        </div>
      </ExchangeContext.Provider>
    );
  }
}

export default App;
