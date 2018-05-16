import React, { Component } from "react";
import { timeParse } from "d3-time-format";
import logo from "./logo.svg";
import "./App.css";
import { availableBooks, ticker, trade } from "./api";
// import Candles from "./components/CandlestickChart";
import Candles from "./components/Candlestick";

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
    // return data.map(d => ({
    //   date: parseDate(d.date),
    //   open: +d.open,
    //   high: +d.high,
    //   low: +d.low,
    //   close: +d.close,
    //   volume: +d.volume
    // }));
    const darkGreen = "#466830";
    const darkRed = "#722837";
    const mediumGreen = "#86af6b";
    const mediumRed = "#ba3040";
    const y = d => (d.open + d.close) / 2;
    return data
      .map((d, i) => ({
        // x: i,
        date: parseDate(d.date),
        x: parseDate(d.date).getDate(),
        yHigh: +d.high,
        yOpen: +d.open,
        yClose: +d.close,
        yLow: +d.low
      }))
      .map(d => ({
        ...d,
        y: (d.yOpen + d.yClose) / 2,
        stroke: d.yOpen > d.yClose ? mediumGreen : mediumRed,
        color: d.yOpen > d.yClose ? darkGreen : darkRed,
        opacity: y(d) > 75 ? 0.7 : 1
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
        <Candles data={data} />
      </div>
    );
  }
}

export default App;
