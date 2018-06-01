import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryCandlestick,
  VictoryZoomContainer
} from "victory";
import { colors } from "../../themes";
import {
  getCurrencies,
  formatToDecimalNotation,
  formatToLocaleString
} from "../../utils";

export default ({ book, data }) => {
  const [from, to] = getCurrencies(book);
  const tickFormatX = v =>
    dayjs(v)
      .locale("es")
      .format("DD MMM");

  const tickFormatY = v => formatToDecimalNotation(v);

  const axisStyle = {
    axis: { stroke: null },
    grid: { stroke: colors.navy.header },
    tickLabels: { fontSize: 12, padding: 5 }
  };

  return (
    <div style={{ cursor: "move" }}>
      <VictoryChart
        width={800}
        scale={{ x: "time" }}
        domainPadding={{ x: 10 }}
        animate={{ duration: 2000 }}
        theme={VictoryTheme.material}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryAxis
          style={axisStyle}
          orientation="top"
          tickFormat={tickFormatX}
        />
        <VictoryAxis
          style={axisStyle}
          orientation="right"
          tickFormat={tickFormatY}
          dependentAxis
        />
        <VictoryCandlestick
          data={data}
          labels={d =>
            [
              `Open ${formatToLocaleString(d.open)} ${to}`,
              `Close ${formatToLocaleString(d.close)} ${to}`,
              `High ${formatToLocaleString(d.high)} ${to}`,
              `Low ${formatToLocaleString(d.low)} ${to}`,
              `Vol. ${formatToLocaleString(d.volume)} ${from}`
            ].join("\n")
          }
          labelComponent={
            <VictoryTooltip
              orientation={"left"}
              flyoutStyle={{
                fill: colors.navy.header,
                fillOpacity: 0.8
              }}
            />
          }
          style={{
            labels: { fill: colors.gray.regular, textAnchor: "end" },
            data: {
              fillOpacity: 0.7,
              stroke: d =>
                d.open < d.close ? colors.green.medium : colors.red.medium
            }
          }}
          candleColors={{
            positive: colors.green.dark,
            negative: colors.red.dark
          }}
          events={[
            {
              onClick: () => {
                return [
                  {
                    target: "data",
                    mutation: () => ({ style: { fill: "gold", width: 30 } })
                  }
                ];
              },
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: () => ({ style: { fill: "gold", width: 30 } })
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: true })
                  }
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: "data",
                    mutation: () => {}
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: false })
                  }
                ];
              }
            }
          ]}
        />
      </VictoryChart>
    </div>
  );
};
