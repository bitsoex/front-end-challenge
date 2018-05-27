import React, { Component } from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import colors from "../colors.css";

class CandlesChart extends Component {
  render() {
    const { candles, volume } = this.props;

    const options = {
      scrollbar: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      chart: {
        backgroundColor: "transparent",
        borderColor: "transparent"
      },
      xAxis: [
        {
          gridLineColor: colors["--palette-grey-700"],
          gridLineDashStyle: "dash",
          gridLineWidth: 1
        }
      ],
      yAxis: [
        {
          height: "80%",
          resize: {
            enabled: true
          },
          gridLineColor: colors["--palette-grey-700"],
          gridLineDashStyle: "dash",
          gridLineWidth: 1
        },
        {
          top: "80%",
          height: "20%",
          gridLineColor: colors["--palette-grey-700"],
          gridLineDashStyle: "dash",
          gridLineWidth: 1
        }
      ],
      plotOptions: {
        candlestick: {
          color: colors["--palette-red-900"],
          lineColor: colors["--palette-red-900"],
          upColor: colors["--palette-green-800"],
          upLineColor: colors["--palette-green-800"]
        }
      },
      tooltip: {
        backgroundColor: colors["--palette-blue-grey-700"],
        borderColor: colors["--palette-blue-grey-500"],
        borderRadius: 3,
        style: {
          color: colors["--palette-grey-500"]
        }
      },
      series: [
        {
          type: "candlestick",
          name: "Candles",
          data: candles
        },
        {
          type: "column",
          name: "Volume",
          data: volume,
          yAxis: 1,
          color: colors["--palette-blue-grey-700"]
        }
      ]
    };
    return <HighchartsReact highcharts={HighStock} constructorType={"stockChart"} options={options} />;
  }
}

export default CandlesChart;
