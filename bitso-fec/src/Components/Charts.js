import React from "react";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { parseChartData } from "../Utils";

class Charts extends React.Component {
  state = {
    loading: true,
    candleData: null,
    volumeData: null,
    timeframe: "1month"
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
        console.log(data);
        this.setState({ ...parseChartData(data) });
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, candleData } = this.state;
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
          // timestamp, open, high, low, close
          data: candleData
        }
      ]
    };

    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <div>
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
