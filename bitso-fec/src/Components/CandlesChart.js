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
      colors: [
        "rgba(114,40,55,0.7)",
        "#8085e9",
        "#8d4654",
        "#7798BF",
        "#aaeeee",
        "#ff0066",
        "#eeaaee",
        "#55BF3B",
        "#DF5353",
        "#7798BF",
        "#aaeeee"
      ],
      chart: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        style: {
          fontFamily: "DINPro-regular, sans-serif"
        },
        zoomType: "x"
      },
      xAxis: [
        {
          gridLineColor: "rgba(216, 212, 212, 0.2)",
          gridLineDashStyle: "dash",
          gridLineWidth: 1,
          lineWidth: 0,
          minorGridLineWidth: 0,
          tickWidth: 0,
          crosshair: {
            color: "rgba(216, 212, 212, 0.2)"
          }
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
      //   tooltip: {
      //     split: true
      //   },
      plotOptions: {
        candlestick: {
          lineColor: "#722837",
          upColor: "rgba(70,104,48,0.7)",
          upLineColor: "#466830",
          downColor: "red"
        }
      },
      tooltip: {
        backgroundColor: "rgba(49,61,76,0.5)",
        borderColor: "rgb(49,61,76)",
        borderRadius: 5,
        borderWidth: 2,
        shadow: false,
        // headerFormat: "<span>Precio: {point.key:,.2f}</span><br/>",
        // pointFormat: "Sum: {point.y:,.2f}<br/>",
        // pointFormat: "<span style="color:{point.color};">\u25CF</span> {series.name} Sum <b>{point.y:,.0f}</b><br/> {point.x}"
        style: {
          color: "#b0bac1",
          fontSize: "1.3rem"
        }
      },
      series: [
        {
          type: "candlestick",
          name: "Precio",
          data: candleData // timestamp, open, high, low, close
        },
        {
          type: "column",
          name: "Volumen",
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
