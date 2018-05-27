import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS, autorun } from "mobx";
import axios from "axios";
import Trades from "../../components/trades/Trades";
import theme from "./Trades.module.css";

@inject("TradesStore")
@inject("BooksStore")
@observer
class TradesContainer extends Component {
  constructor(props) {
    super(props);

    const { TradesStore, BooksStore } = props;

    autorun(() => {
      axios
        .get(`https://api.bitso.com/v3/trades?book=${BooksStore.book}&limit=30`)
        .then(function(response) {
          TradesStore.setAllTrades(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });

    let websocket;
    const newSocket = () => {
      if (websocket) {
        websocket.close();
      }
      const book = BooksStore.book;
      websocket = new WebSocket("wss://ws.bitso.com");
      websocket.onopen = () => {
        websocket.send(JSON.stringify({ action: "subscribe", book: book, type: "trades" }));
      };
      websocket.onmessage = props.TradesStore.getTrades;
    };

    autorun(newSocket);
  }

  render() {
    const { TradesStore } = this.props;

    return (
      <div>
        <Trades trades={toJS(TradesStore.trades)} theme={theme} />
      </div>
    );
  }
}

export default TradesContainer;
