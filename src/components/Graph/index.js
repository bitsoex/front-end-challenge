import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasJS from 'lib/canvasjs.min.js'

class Graph extends Component {
  componentDidMount() {
    var chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      title: {
        text: 'Facebook Stock Price - 2016'
      },
      subtitles: [
        {
          text: 'All Prices are in USD'
        }
      ],
      axisX: {
        valueFormatString: 'MMM'
      },
      axisY: {
        includeZero: false,
        prefix: '$',
        title: 'Price'
      },
      axisY2: {
        prefix: '$',
        suffix: 'bn',
        title: 'Revenue & Income',
        tickLength: 0
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: [
        {
          type: 'candlestick',
          showInLegend: true,
          name: 'Stock Price',
          yValueFormatString: '$#,##0.00',
          xValueFormatString: 'MMMM',
          dataPoints: [
            // Y: [Open, High ,Low, Close]
            {
              x: new Date(2016, 0),
              y: [101.949997, 112.839996, 89.370003, 112.209999]
            },
            {
              x: new Date(2016, 1),
              y: [112.269997, 117.589996, 96.82, 106.919998]
            },
            {
              x: new Date(2016, 2),
              y: [107.830002, 116.989998, 104.400002, 114.099998]
            },
            {
              x: new Date(2016, 3),
              y: [113.75, 120.790001, 106.309998, 117.580002]
            },
            {
              x: new Date(2016, 4),
              y: [117.830002, 121.080002, 115.879997, 118.809998]
            },
            {
              x: new Date(2016, 5),
              y: [118.5, 119.440002, 108.230003, 114.279999]
            },
            {
              x: new Date(2016, 6),
              y: [114.199997, 128.330002, 112.970001, 123.940002]
            },
            {
              x: new Date(2016, 7),
              y: [123.849998, 126.730003, 122.07, 126.120003]
            },
            {
              x: new Date(2016, 8),
              y: [126.379997, 131.979996, 125.599998, 128.270004]
            },
            {
              x: new Date(2016, 9),
              y: [128.380005, 133.5, 126.75, 130.990005]
            },
            {
              x: new Date(2016, 10),
              y: [131.410004, 131.940002, 113.550003, 118.419998]
            },
            { x: new Date(2016, 11), y: [118.379997, 122.5, 114.0, 115.050003] }
          ]
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Net Income',
          axisYType: 'secondary',
          yValueFormatString: '$#,##0.00bn',
          xValueFormatString: 'MMMM',
          dataPoints: [
            { x: new Date(2016, 2), y: 1.51 },
            { x: new Date(2016, 5), y: 2.055 },
            { x: new Date(2016, 8), y: 2.379 },
            { x: new Date(2016, 11), y: 3.568 }
          ]
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Total Revenue',
          axisYType: 'secondary',
          yValueFormatString: '$#,##0.00bn',
          xValueFormatString: 'MMMM',
          dataPoints: [
            { x: new Date(2016, 2), y: 5.382 },
            { x: new Date(2016, 5), y: 6.436 },
            { x: new Date(2016, 8), y: 7.011 },
            { x: new Date(2016, 11), y: 8.809 }
          ]
        }
      ]
    })

    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false
      } else {
        e.dataSeries.visible = true
      }
      e.chart.render()
    }
    chart.render()
  }

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

export default Graph
