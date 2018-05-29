import React, { Component } from 'react';

const ChartBase = ({ children, width, height }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
    {children}
  </svg>
);

const Bar = ({ children, x, y, width, height }) => (
  <g>
    <rect x={x} y={y} width={width} height={height} fill="#252c36" />
    {children}
  </g>
);

const BarContainer = ({ data, width, height, itemSpace }) => {
  const barMargin = 2;
  const barSpace = itemSpace;
  const maxArray = data.map(item => parseFloat(item.volume));
  const maxResult = Math.max(...maxArray);
  // Normalize Data Values
  const normalizedData = data.map(item => {
    const factor = item.volume / maxResult * 100;
    return {
      label: item.date,
      value: data.volume,
      height: factor,
      width: barSpace,
    };
  });

  return (
    <g className="bar-container">
      <CandleContainer data={data} width={width} height={height} />
      {normalizedData.map((item, index) => (
        <Bar
          key={item.label}
          x={index * item.width}
          y={height - item.height}
          width={item.width < barMargin ? item.width : item.width - barMargin}
          height={item.height}
        >
          <line
            className=""
            x1={index * item.width}
            y1={0}
            x2={index * item.width}
            y2={height}
            style={{ stroke: 'rgb(255,0,0)', strokeWidth: 0 }}
          />
        </Bar>
      ))}
    </g>
  );
};

const GridContainer = ({ data, width, height, itemSpace }) => {
  const x1 = 0;
  const y1 = 0;
  const x2 = width;
  const y2 = height;

  return (
    <g>
      {data.map((item, index) => {
        return (
          <line
            className=""
            x1={index * itemSpace}
            y1={0}
            x2={index * itemSpace}
            y2={height}
            style={{ stroke: 'rgb(0,255,0)', strokeWidth: 1 }}
          />
        );
      })}
      <line />
    </g>
  );
};

const CandleContainer = ({ data, width, height }) => {
  const w = 20;
  const h = 20;
  const x = width / 2 - w / 2;
  const y = height / 2 - h / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        style={{ fill: 'rgb(0,0,255)', strokeWidth: 3, stroke: 'rgba(0,0,0, 0.8)' }}
      />
    </g>
  );
};

class ChartComposer extends Component {
  state = {
    dataItemSpace: 0,
  };

  calcItemDataSpace(data, width, period = '1month', interval = 'day') {
    return width / data.length;
  }

  componentWillReceiveProps(nextProps) {
    const { data, width } = nextProps;
    const interval = 'day';
    const period = '1month';
    const dataItemSpace = this.calcItemDataSpace(data, width, period, interval);

    this.setState(
      Object.assign({}, ...this.state, {
        interval,
        period,
        dataItemSpace,
      }),
    );
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
