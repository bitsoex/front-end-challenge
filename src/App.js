import React, { Component } from "react";
import { timeParse } from "d3-time-format";
import logo from "./logo.svg";
import "./App.css";
import { availableBooks, ticker, trade } from "./api";
import Candles from "./components/CandlestickChart";

class App extends Component {
  state = {
    loading: true,
    data: []
  };

  async componentDidMount() {
    await availableBooks();
    await ticker("btc_mxn");
    const data = await this.getData();
    this.setState({
      loading: false,
      data
    });
  }

  getData = async () => {
    const parseDate = timeParse("%Y-%m-%d");
    const data = await trade({ book: "btc_mxn" });
    return data.map(d => ({
      date: parseDate(d.date),
      open: +d.open,
      high: +d.high,
      low: +d.low,
      close: +d.close,
      volume: +d.volume
    }));
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Candles type="svg" data={data} width={100} />
      </div>
    );
  }
}

export default App;
