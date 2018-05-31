import React from "react";

import { ThemeConsumer } from "../../context/Theme";
import Header from "../../components/Header";
import InfoBar from "../../components/InfoBar";
import Candlestick from "../../containers/Candlestick";
import LastTrades from "../../containers/LastTrades";
import Asks from "../../components/Asks";
import Bids from "../../components/Bids";

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
          <Asks />
          <Bids />
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
