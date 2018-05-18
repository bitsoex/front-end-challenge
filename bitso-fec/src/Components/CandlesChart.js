import React from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

class CandlesChart extends React.Component {
  chartOptions = {
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
  render() {
    const { candleData, volumeData } = this.props;
    const candleOptions = {
      ...this.chartOptions,
      chart: {
        backgroundColor: "transparent",
        borderColor: "transparent"
      },
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3
          },
          height: "60%",
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
        {
          labels: {
            align: "right",
            x: -3
          },
          top: "65%",
          height: "35%",
          offset: 0,
          lineWidth: 2
        }
      ],
      series: [
        {
          type: "candlestick",
          data: candleData // timestamp, open, high, low, close
        },
        {
          type: "column",
          data: volumeData,
          yAxis: 1,
          color: "#fff"
        }
      ]
    };
    return (
      <HighchartsReact
        highcharts={HighStock}
        constructorType={"stockChart"}
        options={candleOptions}
      />
    );
  }
}

export default CandlesChart;
