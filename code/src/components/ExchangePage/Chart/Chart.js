import React, { Component } from 'react';

import ChartComposer from './BarChart';
import './Chart.css';
import API_DATA from '../../../utils/mock-data';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: '100',
      canvasWidth: '300',
    };

    this.chartCanvasRef = React.createRef();
  }

  componentDidMount() {
    const newHeight = this.chartCanvasRef.current.clientHeight;
    const newWidth = this.chartCanvasRef.current.clientWidth;

    if (this.state.canvasWidth !== newWidth) {
      this.setState(prevState =>
        Object.assign({}, ...prevState, {
          canvasHeight: `${newHeight}`,
          canvasWidth: `${newWidth - 40}`,
        }),
      );
    }
  }

  render() {
    return (
      <div className="chart-container">
        <ChartOptionsContainer />
        <div ref={this.chartCanvasRef} className="chart-canvas">
          <ChartComposer
            data={API_DATA}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          />
        </div>
      </div>
    );
  }
}

export default Chart;

function ChartOptionsContainer() {
  return (
    <div className="chart-options-container">
      <ChartOptions>
        <ChartDropdown>
          <ChartButton id="chart-select-type">
            <img className="candles-icon" src="img/SVG/icon_candles.svg" alt="candles" />
          </ChartButton>
        </ChartDropdown>
        <ChartDropdown label="Periodo">
          <ChartButton>
            <span className="label">3d</span>
          </ChartButton>
        </ChartDropdown>
        <ChartDropdown label="Intervalo">
          <ChartButton>
            <span className="label">1h</span>
          </ChartButton>
        </ChartDropdown>
      </ChartOptions>
      <ChartOptions>
        <ChartZoom />
      </ChartOptions>
    </div>
  );
}

function ChartOptions({ children }) {
  return (
    <div className="chart-options">
      {children}
    </div>
  );
}

function ChartDropdown({ label, children }) {
  return (
    <div className="chart-dropdown">
      {label ? <span className="chart-dropdown-label">{label}</span> : null}
      {children}
    </div>
  );
}

function ChartButton({ children }) {
  return (
    <div className="chart-button">
      {children}
      <img className="dropdown-icon" src="img/SVG/icon_dropdown.svg" alt="dropdown icon" />
    </div>
  );
}

function ChartZoom() {
  return (
    <div className="chart-zoom">
      <span className="out">-</span>
      <span className="in">+</span>
    </div>
  );
}
