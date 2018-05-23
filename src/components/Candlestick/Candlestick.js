import React from "react";
import { AbstractSeries } from "react-vis";

const predefinedClassName =
  "rv-xy-plot__series rv-xy-plot__series--candlestick";

class CandlestickSeries extends AbstractSeries {
  render() {
    const { className, data, marginLeft, marginTop } = this.props;

    if (!data) {
      return null;
    }

    const xFunctor = this._getAttributeFunctor("x");
    const yFunctor = this._getAttributeFunctor("y");
    const fillFunctor = this._getAttributeFunctor("color");
    const opacityFunctor = this._getAttributeFunctor("opacity");

    const distance = Math.abs(xFunctor(data[1]) - xFunctor(data[0])) * 0.2;
    // const distance = 4;
    const xWidth = distance * 2;
    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map((d, i) => {
          const xTrans = xFunctor(d);
          // Names of values borrowed from here https://en.wikipedia.org/wiki/Candlestick_chart
          const yHigh = yFunctor({ ...d, y: d.yHigh });
          const yOpen = yFunctor({ ...d, y: d.yOpen });
          const yClose = yFunctor({ ...d, y: d.yClose });
          const yLow = yFunctor({ ...d, y: d.yLow });

          return (
            <g
              key={i}
              transform={`translate(${xTrans})`}
              opacity={opacityFunctor ? opacityFunctor(d) : 1}
              onClick={e => this._valueClickHandler(d, e)}
              onMouseOver={e => this._valueMouseOverHandler(d, e)}
              onMouseOut={e => this._valueMouseOutHandler(d, e)}
            >
              {/* Each line inside each candlestick */}
              <line x1={0} x2={0} y1={yHigh} y2={yLow} stroke={d.stroke} />

              {/* Each one of the candlesticks */}
              <rect
                x={-xWidth}
                y={yOpen}
                width={Math.max(xWidth * 2, 0)}
                height={Math.abs(yOpen - yClose)}
                fill={fillFunctor(d)}
                stroke={d.stroke}
              />
            </g>
          );
        })}
      </g>
    );
  }
}

CandlestickSeries.displayName = "CandlestickSeries";

export default CandlestickSeries;
