import React, { Component, Fragment } from "react";
import { timeParse } from "d3-time-format";

import { availableBooks, ticker, trade } from "./api";
import { ThemeProvider, ThemeConsumer } from "./context/Theme";
import Navbar from "./components/Navbar";
import InfoBar from "./components/InfoBar";
import Candles from "./components/Candlestick";

class App extends Component {
  state = {
    loading: false,
    data: []
  };

  async componentDidMount() {
    // await availableBooks();
    // await ticker("btc_mxn");
    // const data = await this.getData();
    // this.setState({
    //   loading: false,
    //   data
    // });
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
      <ThemeProvider>
        <Fragment>
          <Navbar />
          <InfoBar />
          <Candles data={data} />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
