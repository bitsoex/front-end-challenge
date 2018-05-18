import React, { Component, Fragment } from "react";
import { css } from "emotion";
import { timeParse } from "d3-time-format";

import { ticker, trade } from "./api";
import { BookProvider, BookConsumer } from "./context/Book";
import { ThemeProvider } from "./context/Theme";
import Header from "./components/Header";
import InfoBar from "./components/InfoBar";
import Candles from "./components/Candlestick";
import LastTrades from "./components/LastTrades";

const styles = {
  asideLeft: css`
    display: flex;
    order: 2;
  `
};

class App extends Component {
  state = {
    loading: true,
    books: [],
    data: []
  };

  async componentDidMount() {
    // await ticker("btc_mxn");
    // const data = await this.getData();
    this.setState({ loading: false });
  }

  getData = async () => {
    const parseDate = timeParse("%Y-%m-%d");
    const data = await trade({ book: "btc_mxn" });
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
        <BookProvider>
          <Fragment>
            <Header />
            <InfoBar />
            <Candles data={data} />
            <aside className={styles.asideLeft}>
              <BookConsumer>
                {({ book }) => <LastTrades book={book.book} />}
              </BookConsumer>
            </aside>
          </Fragment>
        </BookProvider>
      </ThemeProvider>
    );
  }
}

export default App;
