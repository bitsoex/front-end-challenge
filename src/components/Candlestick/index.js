import React from "react";
import PropTypes from "prop-types";
import { XAxis, YAxis, LineSeries, FlexibleWidthXYPlot } from "react-vis";

import Candlestick from "./Candlestick";

import "./candlestick.scss";

/**
 * Generate random random for candle stick chart
 * @param {number} total - Total number of values.
 * @returns {Array} Array of data.
 */
function buildRandomBinnedData(total) {
  const result = Array(total)
    .fill(0)
    .map((x, i) => {
      const values = [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      ]
        .sort()
        .map(d => Math.floor(d * 100));
      const y = (values[2] + values[1]) / 2;
      return {
        x: i,
        y,
        yHigh: values[3],
        yOpen: values[2],
        yClose: values[1],
        yLow: values[0],
        color: y < 25 ? "#EF5D28" : "#12939A",
        opacity: y > 75 ? 0.7 : 1
      };
    });
  return result;
}

export default class CandlestickExample extends React.Component {
  state = {
    data: buildRandomBinnedData(30)
  };

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        yHigh: PropTypes.number,
        yOpen: PropTypes.number,
        yClose: PropTypes.number,
        yLow: PropTypes.number,
        color: PropTypes.color,
        opacity: PropTypes.number
      })
    ).isRequired
  };

  render() {
    const { data: otherData } = this.state;
    const { data } = this.props;
    console.log("props data", data);
    // console.log("state data", otherData);
    return (
      <div className="candlestick-example">
        <div className="chart">
          <FlexibleWidthXYPlot
            animation
            height={500}
            yDomain={[130000, 180000]}
          >
            <XAxis />
            <YAxis />
            {/* <LineSeries color="#12939A" data={data} /> */}
            {/* <LineSeries
              color="#FF9833"
              className="dashed-example-line"
              data={[{ x: 0, y: 25 }, { x: 30, y: 25 }]}
            />
            <LineSeries
              color="#1A3177"
              className="dashed-example-line"
              opacity={0.3}
              data={[{ x: 0, y: 75 }, { x: 30, y: 75 }]}
            /> */}
            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#79C7E3"
              data={data}
            />
          </FlexibleWidthXYPlot>
        </div>
      </div>
    );
  }
}
