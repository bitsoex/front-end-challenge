import React from "react";
import dayjs from "dayjs";
import { css } from "emotion";
import { format } from "d3-format";
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryZoomContainer
} from "victory";

const sampleData = [
  { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
  { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
  { x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10 },
  { x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7 },
  { x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5 }
];

const styles = {
  candlestick: css`
    width: 100%;
  `,
  chart: css`
    width: 100%;
  `
};

const tickValuesX = data => {
  const flatten = list =>
    list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
  const result = data.map(d => {
    const date = d.date;
    const datePlus12Hours = dayjs(date).add(12, "hours");
    return [date.valueOf(), datePlus12Hours.valueOf()];
  });
  const flattened = flatten(result);
  return flattened;
};

const tickFormatY = v => format("~s")(v);

export default ({ data }) => (
  <div className={styles.candlestick}>
    <div className={styles.chart}>
      <VictoryChart
        containerComponent={<VictoryZoomContainer />}
        theme={VictoryTheme.material}
        domainPadding={{ x: 10 }}
        scale={{ x: "time" }}
      >
        <VictoryAxis orientation="top" tickValues={tickValuesX(data)} />
        <VictoryAxis
          orientation="right"
          tickFormat={tickFormatY}
          dependentAxis
        />
        <VictoryCandlestick
          candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
          data={(() => {
            console.log(data);
            console.log(sampleData);
            return data;
          })()}
        />
      </VictoryChart>
    </div>
  </div>
);
