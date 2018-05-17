import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import uuid from "uuid";

import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  state = {
    loading: true,
    book: "btc_mxn",
    ticker: {},
    books: null,
    firstOrders: null,
    firstTrades: null
  };

  async componentDidMount() {
    const firstOrders = await this.getFirstOrders();
    const firstTrades = await this.getFirstTrades();

    console.log(firstOrders, firstTrades);
    this.setState({
      firstOrders,
      firstTrades,
      loading: false
    });
  }

  getFirstOrders = async () => {
    const { book } = this.state;
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

    return orders;
  };

  getFirstTrades = async () => {
    const { book } = this.state;
    const firstTrades = await axios.get("https://api.bitso.com/v3/trades/", {
      params: { book, sort: "desc", limit: 50 }
    });

    return firstTrades.data.payload;
  };

  render() {
    const { book, loading, firstOrders, firstTrades } = this.state;

    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={bitso_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EXCHANGE</h1>
        </header>
        <Dashboard
          book={book}
          firstOrders={firstOrders}
          firstTrades={firstTrades}
        />
      </div>
    );
  }
}

export default App;
