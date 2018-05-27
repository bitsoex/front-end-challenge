import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import axios from "axios";
import CandleChart from "../../components/candle_chart/CandleChart";

@inject("CandlesStore")
@observer
class ChartsContainer extends Component {
  constructor(props) {
    super(props);

    axios
      .get("https://cors-anywhere.herokuapp.com/https://bitso.com/trade/chartJSON/btc_mxn/1month")
      .then(function(response) {
        props.CandlesStore.setCandlesChart(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { CandlesStore } = this.props;

    return <CandleChart candles={toJS(CandlesStore.candles)} volume={toJS(CandlesStore.volume)} />;
  }
}

export default ChartsContainer;
