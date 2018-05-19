import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import numeral from "numeral";

class DeepChart extends React.Component {
  state = {
    deepBidsData: null,
    deepAsksData: null
  };

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
    },
    legend: {
      enabled: false
    }
  };

  componentDidMount() {
    const { orders } = this.props;
    this.parseDeepData(orders);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orders !== nextProps.orders) {
      this.parseDeepData(nextProps.orders);
    }
  }

  parseDeepData = data => {
    const deepBidsData = _.map(data.bids, item => [+item.price, +item.sum]);
    const deepAsksData = _.map(data.asks, item => [+item.price, +item.sum]);
    this.setState({ deepBidsData, deepAsksData });
  };

  render() {
    const { deepBidsData, deepAsksData } = this.state;
    const options = {
      ...this.chartOptions,
      chart: {
        type: "area",
        backgroundColor: "transparent",
        borderColor: "transparent",
        style: {
          fontFamily: "DINPro-regular, sans-serif"
        }
      },
      title: {
        text: ""
      },
      xAxis: {
        allowDecimals: true,
        labels: {
          formatter: function() {
            return numeral(this.value).format("$0,0.00"); // clean, unformatted number for year
          },
          style: {
            color: "rgba(216, 212, 212, 0.2)"
          }
        },
        gridLineColor: "rgba(216, 212, 212, 0.2)",
        gridLineDashStyle: "dash",
        gridLineWidth: 1,
        lineWidth: 0,
        minorGridLineWidth: 0,
        tickWidth: 0
      },
      yAxis: {
        visible: false,
        title: {
          text: ""
        },
        labels: {
          formatter: function() {
            return this.value;
          }
        },
        gridLineWidth: 0
      },
      tooltip: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderRadius: 3,
        borderWidth: 0,
        shadow: false,
        headerFormat: "<span>Precio: {point.key:,.2f}</span><br/>",
        pointFormat: "Sum: {point.y:,.2f}<br/>",
        // pointFormat: "<span style="color:{point.color};">\u25CF</span> {series.name} Sum <b>{point.y:,.0f}</b><br/> {point.x}"
        style: {
          color: "#b0bac1",
          fontSize: "1.3rem"
        }
      },
      plotOptions: {
        area: {
          //   pointStart: 1940,
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [
        {
          name: "Asks",
          data: deepAsksData,
          color: "#466830"
        },
        {
          name: "Bids",
          data: deepBidsData,
          color: "#722837"
        }
      ]
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

export default DeepChart;
