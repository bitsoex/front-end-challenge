import React, { Component } from "react";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import colors from "../colors.css";
import theme from "./CandleChart.module.css";

class CandlesChart extends Component {
  render() {
    const { candles, volume, setPeriod, selectedPeriod } = this.props;
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

    const candlesPeriods = [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "1year", label: "1 Year" }];

    return (
      <div>
        <span className={theme.title}>Periodo</span>
        <span className={theme.period}>
          <Dropdown auto className={theme.inputLabel} theme={theme} onChange={setPeriod} source={candlesPeriods} value={selectedPeriod} />
        </span>
        <HighchartsReact highcharts={HighStock} constructorType={"stockChart"} options={options} />
      </div>
    );
  }
}

export default CandlesChart;
