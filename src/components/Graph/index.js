import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import MiniListSelector from 'components/MiniListSelector'
import { PERIODS, INTERVALS, extractDataPoints } from 'lib/constants'
import { CHART_OPTIONS } from './constants'

import candlesIcon from 'assets/icons/candles.svg'
import './style.less'

/**
 * Component that handles the render of all chart types
 * @extends Component
 */
class Graph extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    onPeriodSelect: PropTypes.func.isRequired
  }

  state = {
    period: PERIODS[0],
    interval: INTERVALS[0],
    options: CHART_OPTIONS
  }

  static getDerivedStateFromProps(nexProps, prevState) {
    const chartData = nexProps.chartData

    const maximum = chartData.reduce(
      (max, { high }) => (parseFloat(high) > max ? parseFloat(high) : max),
      0
    )

    const volumeDataPoints = chartData.map(({ volume, date }) => {
      return [new Date(date).getTime(), parseFloat(volume)]
    })

    return {
      options: {
        ...prevState.options,

        yAxis: [
          prevState.options.yAxis[0],
          {
            ...prevState.options.yAxis[1],
            max: maximum / 150
          }
        ],
        series: [
          {
            type: 'candlestick',
            data: extractDataPoints(chartData)
          },
          {
            type: 'column',
            name: 'Volume',
            color: '#252c36',
            yAxis: 1,
            data: volumeDataPoints
          }
        ]
      }
    }
  }

  onPeriodSelect = item => {
    this.setState({
      period: item
    })
    this.props.onPeriodSelect(item.value)
  }

  onIntervalSelect = item => {
    this.setState({ interval: item })
  }

  render() {
    const {
      state: { period, interval, options }
    } = this

    return (
      <div className="graph-container">
        <div className="actions-container">
          <div className="type-duration-container">
            <div className="mini-list-selector --solid">
              <span>
                <img
                  src={candlesIcon}
                  alt="candle"
                  style={{ width: 22, height: 22 }}
                />
              </span>
            </div>
            <div>
              <span>Periodo</span>
              <MiniListSelector
                value={period}
                items={PERIODS}
                onItemSelect={this.onPeriodSelect}
              />
            </div>
            <div>
              <span>Intervalo</span>
              <MiniListSelector
                value={interval}
                items={INTERVALS}
                onItemSelect={this.onIntervalSelect}
              />
            </div>
          </div>
          <div className="zoom">
            <div />
          </div>
        </div>
        <div className="graph">
          <HighchartsReact
            constructorType={'stockChart'}
            highcharts={Highcharts}
            options={options}
          />
        </div>
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
