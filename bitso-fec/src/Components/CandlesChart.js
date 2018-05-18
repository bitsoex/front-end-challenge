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
        borderColor: "transparent",
        style: {
          fontFamily: "DINPro-regular, sans-serif"
        }
      },
      xAxis: [
        {
          gridLineColor: "rgba(216, 212, 212, 0.2)",
          gridLineDashStyle: "dash",
          gridLineWidth: 1,
          lineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 0
        }
      ],
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3
          },
          height: "75%",
          lineWidth: 0,
          resize: {
            enabled: true
          },
          gridLineColor: "rgba(216, 212, 212, 0.2)",
          gridLineDashStyle: "dash",
          gridLineWidth: 1,
          minorGridLineWidth: 0,
          tickWidth: 0
        },
        {
          labels: {
            align: "right",
            x: -3
          },
          top: "75%",
          height: "25%",
          offset: 0,
          lineWidth: 0,
          gridLineColor: "rgba(216, 212, 212, 0.2)",
          gridLineDashStyle: "dash",
          gridLineWidth: 1,
          minorGridLineWidth: 0,
          tickWidth: 0
        }
      ],
      tooltip: {
        split: true
      },
      series: [
        {
          type: "candlestick",
          data: candleData // timestamp, open, high, low, close
        },
        {
          type: "column",
          data: volumeData,
          yAxis: 1,
          color: "var(--Navy-headers)"
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
