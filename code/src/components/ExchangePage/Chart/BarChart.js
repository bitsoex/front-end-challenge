import React, { Component } from 'react';

function ChartBase({ children, width, height }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {children}
    </svg>
  );
}

function Bar({ children, x, y, width, height }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#252c36" />
      {children}
    </g>
  );
}

function BarContainer({ data, width, height, itemSpace }) {
  const barMargin = 2;
  const barSpace = itemSpace;
  const maxArray = data.map(item => parseFloat(item.volume));
  const maxResult = Math.max(...maxArray);
  // Normalize Data Values
  const normalizedData = data.map(item => {
    const factor = item.volume / maxResult * 100;
    return Object.assign({}, item, {
      label: item.date,
      height: factor,
      width: barSpace,
    });
  });

  return (
    <g className="bar-container">
      {normalizedData.map((item, index) => (
        <g key={index}>
          <CandleContainer
            maxResult={maxResult}
            item={item}
            index={index}
            width={width}
            height={height}
          />

          {(
            <rect
              key={index}
              x={index * item.width}
              y={0}
              width={item.width < barMargin ? item.width : item.width - barMargin}
              height={height}
              fill="rgba(37,44,54, 0)"
            />
          ) && false}
          <Bar
            key={item.label}
            x={index * item.width}
            y={height - item.height}
            width={item.width < barMargin ? item.width : item.width - barMargin}
            height={item.height}
          >
            <line
              x1={index * item.width}
              y1={0}
              x2={index * item.width}
              y2={height}
              style={{ stroke: 'rgb(255,0,0)', strokeWidth: 0 }}
            />
          </Bar>
        </g>
      ))}
    </g>
  );
}

function GridContainer({ data, width, height, itemSpace }) {
  const x1 = 0;
  const y1 = 0;
  const x2 = width;
  const y2 = height;
  const thresholds = {
    t100: height,
    t75: height * 0.25,
    t50: height * 0.5,
    t25: height * 0.75,
  };

  return (
    <g>
      {data.map((item, index) => {
        if (index === 0 || index % 15 === 0) {
          return (
            <line
              key={index}
              x1={index * itemSpace}
              y1={0}
              x2={index * itemSpace}
              y2={height}
              style={{ stroke: 'rgb(49,61,76, 0.6)', strokeWidth: 1 }}
            />
          );
        }
      })}

      <line
        x1={0}
        y1={thresholds.t25}
        x2={width}
        y2={thresholds.t25}
        strokeDasharray="5, 5"
        className="horizontal-threshold"
      />

      <line
        x1={0}
        y1={thresholds.t50}
        x2={width}
        y2={thresholds.t50}
        strokeDasharray="5, 5"
        className="horizontal-threshold"
      />
      <line
        x1={0}
        y1={thresholds.t75}
        x2={width}
        y2={thresholds.t75}
        strokeDasharray="5, 5"
        className="horizontal-threshold"
      />
      <line
        x1={0}
        y1={thresholds.t100 - height}
        x2={width}
        y2={thresholds.t100 - height}
        strokeDasharray="5, 5"
        className="horizontal-threshold"
      />
    </g>
  );
}

function CandleContainer({ item, index, width, height }) {
  if (width === 300 && height === 100) return <g />;
  const { date, dated, high, label, low, close, open, value, volume, vwap } = item;
  const factor = 0.0004;

  // Box
  const boxCoord = {
    w: item.width - 4 > 0 ? item.width - 4 : 1,
    x: index * item.width,
    h: close * factor,
    y: open * factor,
  };

  // Candle Lines
  const xCenter = boxCoord.x + boxCoord.w / 2;
  const topLineCoord = {
    // Goes Up
    x2: xCenter,
    y2: boxCoord.y + (boxCoord.y - high * factor),
    // Goes Down
    x1: xCenter,
    y1: boxCoord.y,
  };
  const candleBottom = boxCoord.y + boxCoord.h;
  const bottomLineCoord = {
    // Goes Up
    x2: xCenter,
    y2: candleBottom,
    // Goes Down
    x1: xCenter,
    y1: candleBottom + (boxCoord.y - low * factor),
  };

  const candleClass = close > open ? 'candle-box green' : 'candle-box red';
  if (index == 0)
    console.log(
      'width: ',
      width,
      'height: ',
      height,
      'item',
      item,
      'boxCoord',
      boxCoord,
      'TopLineCoord',
      topLineCoord,
    );
  return (
    <g data-name="candle-element">
      <rect
        className={candleClass}
        x={boxCoord.x}
        y={boxCoord.y}
        width={boxCoord.w}
        height={boxCoord.h}
      />
      <line
        className={candleClass}
        x1={topLineCoord.x1}
        y1={topLineCoord.y1}
        x2={topLineCoord.x2}
        y2={topLineCoord.y2}
      />
      <line
        className={candleClass}
        x1={bottomLineCoord.x1}
        y1={bottomLineCoord.y1}
        x2={bottomLineCoord.x2}
        y2={bottomLineCoord.y2}
      />
    </g>
  );
};

class ChartComposer extends Component {
  constructor(props) {
    super(props);

    this.state = { dataItemSpace: 0 };
  }

  componentWillReceiveProps(nextProps) {
    const { data, width } = nextProps;
    const interval = 'day';
    const period = '1month';
    const dataItemSpace = this._calcItemDataSpace(data, width, period, interval);

    this.setState(
      Object.assign({}, ...this.state, {
        interval,
        period,
        dataItemSpace,
      }),
    );
  }

  _calcItemDataSpace(data, width, period = '1month', interval = 'day') {
    return width / data.length;
  }

  render() {
    const { data, width, height } = this.props;

    return (
      <ChartBase width={width} height={height}>
        <GridContainer
          data={data}
          itemSpace={this.state.dataItemSpace}
          width={width}
          height={height}
        />
        <BarContainer
          data={data}
          itemSpace={this.state.dataItemSpace}
          width={width}
          height={height}
        />
      </ChartBase>
    );
  }
}

export default ChartComposer;
