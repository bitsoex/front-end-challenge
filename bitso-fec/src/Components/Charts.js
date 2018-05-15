import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import ExchangeContext from "../Contexts/ExchangeContext";

class Charts extends React.Component {
  render() {
    return (
      <ExchangeContext.Consumer>
        {({ book, timeframe, candleData, volumeData }) => {
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
          return (
            <div>
              <h3>Charts</h3>
              <span>{book}</span>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
              />
            </div>
          );
        }}
      </ExchangeContext.Consumer>
    );
  }
}

export default Charts;
