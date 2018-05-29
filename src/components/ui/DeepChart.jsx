// based on react stockcharts examples:
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/HorizontalBarChart

import React from 'react'
import PropTypes from 'prop-types'
import { max } from 'd3-array'
import { scaleLinear, scalePoint } from 'd3-scale'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { AreaSeries } from 'react-stockcharts/lib/series'
import { XAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'

import { floatStringToLocaleString } from '../../lib/utils'

const DEFAULT_WIDTH = 980
const DEFAULT_HEIGHT = 300

function addSumToPositionsArray (positionsArray) {
  const oneArrayElement = 1
  const [ initial ] = positionsArray
  return positionsArray.slice(oneArrayElement).reduce((reducer, bid) => {
    const sum = reducer[reducer.length - oneArrayElement].sum + parseFloat(bid.amount)
    return [ ...reducer, { ...bid, sum } ]
  }, [ { ...initial, sum: parseFloat(initial.amount) } ])
}

class AreaChartWithYPercent extends React.Component {
  static propTypes = {
    bids: PropTypes.array.isRequired,
    asks: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
  }

  static defaultProps = {
    type: 'hybrid',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  }

  render () {
    const { type, width, height, ratio, currency, bids, asks } = this.props
    const margin = { left: 0, right: 0, top: 20, bottom: 0 }

    const showGrid = true
    const gridHeight = height - margin.top - margin.bottom
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {}

    // .map(bid => ({ ...bid, type: 'bid' }))
    // .map(bid => ({ ...bid, type: 'ask' }))

    const ascSortedBids = bids.sort((left, right) => left.price - right.price)

    let ascSortedAsks = addSumToPositionsArray(asks.sort((left, right) => left.price - right.price))

    const data = ascSortedBids.map(bid => ({ ...bid, type: 'bid' })).concat(ascSortedAsks).sort((left, right) => left.price - right.price)
    const [ first ] = data

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={margin}
        seriesName='MSFT'
        data={data}
        type={type}
        xAccessor={d => d.price}
        xScale={scaleLinear()}
        xExtents={data => [first.price, max(data, d => d.price)]}
        displayXAccessor={d => d.price}
      >
        <Chart id={0} yExtents={d => d.amount} yScale={scalePoint()}>
          <XAxis
            axisAt='top'
            orient='top'
            ticks={8}
            tickFormat={price => floatStringToLocaleString(price, { currency })}
            tickStroke='rgba(56, 69, 85, .6)'
            stroke='rgba(56, 69, 85, .4)'
            {...xGrid}
          />
          <AreaSeries
            yAccessor={d => {
              if (d.type === 'bid') return d.amount
            }}
            stroke='#86AF6B'
            fill='#86AF6B'
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

export default fitWidth(AreaChartWithYPercent)
