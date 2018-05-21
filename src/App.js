import React, { Component, Fragment } from "react";
import { css } from "emotion";
import { timeParse } from "d3-time-format";

import { ticker, trade } from "./api";
import { BookProvider, BookConsumer } from "./context/Book";
import { ThemeProvider, ThemeConsumer } from "./context/Theme";
import Header from "./components/Header";
import InfoBar from "./components/InfoBar";
import Candles from "./components/Candlestick";
import LastTrades from "./components/LastTrades";

const styles = {
  container: css`
    display: flex;
    flex-flow: row wrap;
    & > * {
      flex: 1 100%;
    }

    @media all and (min-width: 600px) {
      .aside {
        flex: 1 auto;
        max-width: 300px;
        padding: 10px;
      }
    }

    @media all and (min-width: 800px) {
      .main {
        flex: 3 0px;
      }
      .aside-left {
        order: 1;
      }
      .main {
        order: 2;
      }
      .aside-right {
        order: 3;
      }
    }
  `
};

class App extends Component {
  state = {
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
    const { data } = this.state;
    return (
      <ThemeProvider>
        <BookProvider>
          <ThemeConsumer>
            {({ theme }) => (
              <div style={theme} className={styles.container}>
                <Header />
                <InfoBar />
                <section className="main">
                  <Candles data={data} />
                </section>
                <aside className="aside aside-left">
                  <BookConsumer>
                    {({ book }) => <LastTrades book={book.book} />}
                  </BookConsumer>
                </aside>
                <aside className="aside aside-right">
                  <div>Aside right</div>
                </aside>
              </div>
            )}
          </ThemeConsumer>
        </BookProvider>
      </ThemeProvider>
    );
  }
}

export default App;
