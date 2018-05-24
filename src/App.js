import React, { Component } from "react";
import { css } from "emotion";
// import { timeParse } from "d3-time-format";
import dayjs from "dayjs";

import { trade } from "./api";
import { colors } from "./themes";
import { BookProvider, BookConsumer } from "./context/Book";
import { ThemeProvider, ThemeConsumer } from "./context/Theme";
import Header from "./components/Header";
import InfoBar from "./components/InfoBar";
import Fetch from "./components/Fetch";
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
    // this.setState({ data });
  }

  dataMapperFormat = (d, i) => {
    // const parseDate = timeParse("%Y-%m-%d");
    const date = dayjs(d.date);
    return {
      // date: parseDate(d.date),
      date,
      x: date.valueOf(),
      yHigh: +d.high,
      yOpen: +d.open,
      yClose: +d.close,
      yLow: +d.low
    };
  };

  dataMapperValues = d => {
    const y = d => (d.yOpen - d.yClose) * 2;
    return {
      ...d,
      y: y(d),
      opacity: 0.7,
      stroke: d.yOpen > d.yClose ? colors.green.medium : colors.red.medium,
      color: d.yOpen > d.yClose ? colors.green.dark : colors.red.dark
    };
  };

  getData = async () => {
    const data = await trade({ book: "btc_mxn" });
    return data.map(this.dataMapperFormat).map(this.dataMapperValues);
  };

  render() {
    const { data } = this.state;
    return (
      <ThemeProvider>
        <BookProvider>
          <ThemeConsumer>
            {({ theme }) => (
              <BookConsumer>
                {({ book }) => (
                  <div style={theme} className={styles.container}>
                    <Header />
                    <InfoBar />
                    <section className="main">
                      <Fetch promise={async () => trade({ book: book.book })}>
                        {({ data }) => (
                          <Candles
                            data={data
                              .map(this.dataMapperFormat)
                              .map(this.dataMapperValues)}
                          />
                        )}
                      </Fetch>
                    </section>
                    <aside className="aside aside-left">
                      <LastTrades book={book.book} />}
                    </aside>
                    <aside className="aside aside-right">
                      <div>Aside right</div>
                    </aside>
                  </div>
                )}
              </BookConsumer>
            )}
          </ThemeConsumer>
        </BookProvider>
      </ThemeProvider>
    );
  }
}

export default App;
