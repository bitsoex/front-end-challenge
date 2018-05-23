import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Trades from "../../components/trades/Trades";
import theme from "./Trades.module.css";

@inject("TradesStore")
@observer
class TradesContainer extends Component {
  constructor(props) {
    super(props);
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
