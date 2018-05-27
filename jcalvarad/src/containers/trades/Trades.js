import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import axios from "axios";
import Trades from "../../components/trades/Trades";
import theme from "./Trades.module.css";

@inject("TradesStore")
@observer
class TradesContainer extends Component {
  constructor(props) {
    super(props);

    axios
      .get("https://api.bitso.com/v3/trades?book=btc_mxn&limit=30")
      .then(function(response) {
        props.TradesStore.setAllTrades(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    const websocket = new WebSocket("wss://ws.bitso.com");

    websocket.onopen = function() {
      websocket.send(JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "trades" }));
    };

    websocket.onmessage = props.TradesStore.getTrades;
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
