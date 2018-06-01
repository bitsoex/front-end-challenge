import React from "react";

import { ThemeConsumer } from "../../context/Theme";
import Header from "../../components/Header";
import InfoBar from "../../components/InfoBar";
import Candlestick from "../../containers/Candlestick";
import LastTrades from "../../containers/LastTrades";
import Asks from "../../components/OrderBook/Asks";
import Bids from "../../components/OrderBook/Bids";

import styles from "./styles";

import "react-vis/dist/style.css";

export default () => (
  <ThemeConsumer>
    {({ theme }) => (
      <div style={theme} className={styles.container}>
        <Header />
        <InfoBar />
        <section className="main">
          <Candlestick />
          <div className={styles.orderBookContainer}>
            <Bids />
            <Asks />
          </div>
        </section>
        <aside className="aside aside-left">
          <LastTrades />
        </aside>
        <aside className="aside aside-right">
          <div>Aside right</div>
        </aside>
      </div>
    )}
  </ThemeConsumer>
);
