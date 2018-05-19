import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CanvasJS from 'lib/canvasjs.min.js'

class Graph extends Component {
  componentDidUpdate() {
    console.log('UPDATE...')
    const chartData = this.props.chartData

    console.log({ chartData })
    const dataPoints = chartData.map(({ date, open, high, low, close }) => ({
      x: new Date(date),
      y: [
        parseFloat(open),
        parseFloat(high),
        parseFloat(low),
        parseFloat(close)
      ]
    }))

    const chart = new CanvasJS.Chart('chartContainer', {
      // animationEnabled: true,
      backgroundColor: 'rgba(0,0,0,0.0)',
      axisX2: {
        labelFontColor: '#384555',
        lineColor: '#252c36',
        gridThickness: 1,
        gridColor: '#252c36',
        tickColor: '#252c36'
      },
      axisY2: {
        // minimum: 150000,
        labelFontColor: '#384555',
        valueFormatString: '#,##0,.',
        suffix: 'K',
        lineColor: '#191e23',
        gridColor: '#252c36',
        gridDashType: 'dash',
        lineThickness: 1,
        tickColor: '#252c36'
      },
      axisY: {
        lineThickness: 1,
        lineColor: '#252c36'
      },
      toolTip: {
        shared: true,
        borderColor: '#b0bac1',
        fontColor: '#b0bac1',
        borderThickness: 1,
        cornerRadius: 10,
        backgroundColor: 'rgba(56, 69, 85, 0.8)'
      },
      data: [
        {
          axisYType: 'secondary',
          axisXType: 'secondary',
          type: 'candlestick',
          color: '#80c156',
          risingColor: '#80c156',
          fallingColor: '#cc4458',
          border: 0,
          whiskerThickness: 0.5,
          fillOpacity: 0.8,
          // name: 'Stock Price',
          // yValueFormatString: '$#,##0.00',
          // xValueFormatString: 'MMMM',
          dataPoints
        }
        // {
        //   type: 'column',
        //   // showInLegend: true,
        //   // name: 'Net Income',
        //   axisYType: 'secondary',
        //   yValueFormatString: '$#,##0.00bn',
        //   xValueFormatString: 'MMMM',
        //   dataPoints: [
        //     { x: new Date(2016, 2), y: 1.51 },
        //     { x: new Date(2016, 5), y: 2.055 },
        //     { x: new Date(2016, 8), y: 2.379 },
        //     { x: new Date(2016, 11), y: 3.568 }
        //   ]
        // }
      ]
    })

    chart.render()
  }

  componentDidMount() {}

  render() {
    return (
      <div className="graph-container">
        <div className="actions-container">
          <div className="type-duration-container">
            <div>
              <ul />
            </div>
            <div>
              <span>Periodo</span>
              <ul />
            </div>
            <div>
              <span>Intervalo</span>
            </div>
          </div>
          <div className="zoom">
            <div />
          </div>
        </div>
        <div className="graph" id="chartContainer" />
      </div>
    )
  }
}

function mapStateToProps({ chartData }) {
  return {
    chartData
  }
}

export default connect(mapStateToProps)(Graph)
