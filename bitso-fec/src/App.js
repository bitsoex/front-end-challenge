import React, { Component } from "react";
import axios from "axios";
import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";

import Trades from "./Components/Trades";
import Orders from "./Components/Orders";
// import OrderData from "./Modules/OrderData";
import Charts from "./Components/Charts";

class App extends Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    loading: true,
    book: "btc_mxn",
    ticker: {},
    books: null,
    tempOrders: null,
    orders: null,
    trades: null
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
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  getOrders = async () => {
    const orders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book: "btc_mxn", aggregate: true }
    });

    this.setState({ tempOrders: orders, loading: false });
  };

  render() {
    const { loading, book, tempOrders } = this.state;
    if (loading) {
      return <div>Cargando...</div>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={bitso_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bitso Exchange</h1>
        </header>
        <div style={{ display: "flex", width: "90em", margin: "auto" }}>
          <Trades />
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Charts book={book} />
            <Orders
              book={book}
              tempOrders={tempOrders}
              websocket={this.websocket}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
