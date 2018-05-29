import React, { Component } from 'react';
import './Chart.css';
import API_DATA from '../../../utils/mock-data';

import ChartComposer from './BarChart';

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
          canvasWidth: `${newWidth - 20}`,
        }),
      );
    }
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-option-toggles">Option Toggles</div>
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
