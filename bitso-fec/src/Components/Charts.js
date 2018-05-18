import React from "react";
import _ from "lodash";

import DeepChart from "./DeepChart";
import CandlesChart from "./CandlesChart";

class Charts extends React.Component {
  componentDidMount() {
    this.props.handleFirstRender();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.isFirstChartRender) {
      return true;
    }

    if (nextProps.candleData !== this.props.candleData) {
      return true;
    }

    if (this.props.currentChart === "deep") {
      return true;
    }

    return false;
  }

  render() {
    const {
      orders,
      currentChart,
      candleData,
      volumeData,
      isFirstChartRender
    } = this.props;

    if (isFirstChartRender && _.isEmpty(orders)) {
      return <div>Cargando...</div>;
    }

    return currentChart === "candles" ? (
      <CandlesChart candleData={candleData} volumeData={volumeData} />
    ) : (
      <DeepChart orders={orders} />
    );
  }
}

export default Charts;
