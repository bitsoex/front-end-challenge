import React from "react";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { parseChartData } from "../Utils";
import ChartBar from "./ChartBar";

class Charts extends React.Component {
  state = {
    loading: true,
    candleData: null,
    volumeData: null,
    timeframe: "1month",
    currentChart: "candles" // candles o deep
  };

  componentDidMount() {
    this.getChartJSON();
  }

  getChartJSON = async () => {
    const { book } = this.props;
    const { timeframe } = this.state;
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

  render() {
    const { loading, candleData, currentChart } = this.state;
    const options = {
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
      },
      series: [
        {
          type: "candlestick",
          data: candleData // timestamp, open, high, low, close
        }
      ]
    };

    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <div style={{ flex: 1 }}>
        <ChartBar currentChart={currentChart} toggleChart={this.toggleChart} />
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </div>
    );
  }
}

export default Charts;
