import React from "react";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";

import { parseChartData } from "../Utils";
import ChartBar from "./ChartBar";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      candleData: null,
      volumeData: null,
      timeframe: "1month",
      currentChart: "candles", // candles o deep
      deepAskData: null,
      deepBidData: null
    };

    this.chartOptions = {
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      }
    };
  }

  componentDidMount() {
    this.getChartJSON(this.state.timeframe);
  }

  getChartJSON = async timeframe => {
    const { book } = this.props;
    try {
      const { data, status } = await axios.get(
        `https://bitso.com/trade/chartJSON/${book}/${timeframe}`
      );
      if (status === 200) {
        this.setState({ ...parseChartData(data) });
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  };

  toggleChart = () => {
    this.setState({
      currentChart: this.state.currentChart === "candles" ? "deep" : "candles"
    });
  };

  onChangeTimeframe = timeframe => {
    this.setState({
      timeframe
    });
    this.getChartJSON(timeframe);
  };

  render() {
    const { orders } = this.props;
    const { loading, timeframe, candleData, currentChart } = this.state;
    const candleOptions = {
      ...this.chartOptions,
      series: [
        {
          type: "candlestick",
          data: candleData // timestamp, open, high, low, close
        }
      ]
    };

    const deepOptions = {
      ...this.chartOptions,
      series: [{ type: "area", data: [[0, 0], [1, 1]] }]
    };

    if (loading && _.isEmpty(orders)) {
      return <div>Cargando...</div>;
    }

    return (
      <div style={{ flex: 1 }}>
        <ChartBar
          currentChart={currentChart}
          timeframe={timeframe}
          toggleChart={this.toggleChart}
          onChangeTimeframe={this.onChangeTimeframe}
        />
        {currentChart === "candles" ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={candleOptions}
          />
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={deepOptions}
          />
        )}
      </div>
    );
  }
}

export default Charts;
