import React from "react";
import { withRouter } from "react-router-dom";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { parseTicker, parsePrice } from "../Utils";

class SidebarMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.match.params.book === props.item.book || false
    };
  }

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

  toggleItem = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { item } = this.props;
    const { isOpen } = this.state;

    const options = {
      chart: {
        backgroundColor: null,
        borderWidth: 0,
        borderColor: null,
        width: 270,
        height: 120,
        style: {
          fontFamily: "DINPro-regular, sans-serif",
          overflow: "visible"
        },

        // small optimalization, saves 1-2 ms each sparkline
        skipClone: true
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickPositions: [],
        lineWidth: 0,
        minorGridLineWidth: 0,
        tickWidth: 0,
        crosshair: {
          color: "rgba(216, 212, 212, 0.2)"
        }
      },
      yAxis: {
        endOnTick: false,
        gridLineWidth: 0,
        startOnTick: false,
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        tickPositions: [0]
      },
      legend: {
        enabled: false
      },
      tooltip: {
        style: { color: "var(--light-text)" },
        headerFormat: null,
        pointFormat: "<b>{point.y:,.2f}</b><br/>",
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        hideDelay: 0,
        shared: true,
        padding: 0,
        positioner: function(w, h, point) {
          return { x: point.plotX - w / 2, y: point.plotY - h };
        }
      },
      plotOptions: {
        series: {
          animation: false,
          lineWidth: 1,
          shadow: false,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          marker: {
            radius: 1,
            states: {
              hover: {
                radius: 2
              }
            }
          },
          fillOpacity: 0.25
        },
        column: {
          negativeColor: "#910000",
          borderColor: "silver"
        }
      },
      series: [
        {
          data: item.lineData,
          pointStart: 1,
          color: item.diff >= 0 ? "var(--Dark-green)" : "var(--Dark-red)",
          lineWidth: 2
        }
      ]
    };
    return (
      <React.Fragment>
        <div
          className={classNames("market-list__item", { active: isOpen })}
          onClick={this.toggleItem}
        >
          <div className="market-list__ticker">{parseTicker(item.book)}</div>
          <div
            className={classNames(
              "market-list__price",
              { up: item.diff >= 0 },
              { down: item.diff < 0 }
            )}
          >
            {parsePrice(item.price, item.book)}
          </div>
        </div>
        <Collapse
          isOpened={isOpen}
          fixedHeight={120}
          style={{
            backgroundColor: "var(--dark-navy)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Collapse>
      </React.Fragment>
    );
  }
}

export default withRouter(SidebarMenuItem);
