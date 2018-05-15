import React, { Component } from "react";
import axios from "axios";
import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";

import Trades from "./Components/Trades";
import ExchangeContext from "./Contexts/ExchangeContext";
import Charts from "./Components/Charts";
import { parseChartData } from "./Utils";

class App extends Component {
  state = {
    book: "btc_mxn",
    ticker: {},
    books: null,
    orders: null,
    trades: null,
    timeframe: "3months",
    candleData: null,
    volumeData: null,
    loading: true
  };

  componentDidMount() {
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
            <Charts />
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </ExchangeContext.Provider>
    );
  }
}

export default App;
