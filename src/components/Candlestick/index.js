import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  FlexibleXYPlot
} from "react-vis";
import { format } from "d3-format";
import { css } from "emotion";
import dayjs from "dayjs";
import { colors } from "../../themes";
import Candlestick from "./Candlestick";

const styles = {
  candlestick: css`
    width: 100%;
  `,
  chart: css`
    width: 100%;
  `,
  xyPlot: css`
    .rv-xy-plot__inner {
      width: 106%;
      padding-top: 15px;
    }
  `
};
export default class CandlestickExample extends Component {
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

  tickFormatY = v => format("~s")(v);

  tickValuesX = () => {
    const { data } = this.props;
    const flatten = list =>
      list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    const result = data.map(d => {
      const date = d.date;
      const datePlus12Hours = dayjs(date).add(12, "hours");
      return [date.valueOf(), datePlus12Hours.valueOf()];
    });
    console.log(flatten(result));
    return flatten(result);
  };

  render() {
    const { data } = this.props;
    console.log("props data", data);
    return (
      <div className={styles.candlestick}>
        <div className={styles.chart}>
          <FlexibleXYPlot
            className={styles.xyPlot}
            animation
            height={500}
            yDomain={[150000, 190000]}
            xType="time"
          >
            <VerticalGridLines
              style={{
                stroke: colors.navy.header,
                strokeDasharray: "2, 2"
              }}
            />
            <HorizontalGridLines
              style={{
                stroke: colors.navy.header,
                strokeDasharray: "2, 2"
              }}
            />

            <XAxis orientation="top" tickValues={this.tickValuesX()} hideLine />
            <YAxis orientation="right" tickFormat={this.tickFormatY} hideLine />

            {/* <LineSeries color="#12939A" data={data} /> */}

            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#79C7E3"
              data={data}
            />
          </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}
