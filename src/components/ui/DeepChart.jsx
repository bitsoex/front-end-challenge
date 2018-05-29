// based on react stockcharts examples:
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/HorizontalBarChart

import React from 'react'
import PropTypes from 'prop-types'
import { max } from 'd3-array'
import { scaleLinear } from 'd3-scale'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { AreaSeries } from 'react-stockcharts/lib/series'
import { XAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'

import { floatStringToLocaleString } from '../../lib/utils'

const DEFAULT_WIDTH = 980
const DEFAULT_HEIGHT = 300
const oneArrayElement = 1

const tooltipContent = (type, currency) => ({ currentItem }) => ({
  x: `${currency === 'mxn' ? floatStringToLocaleString(currentItem.price, { minimunFractionDigits: 2 }) : currentItem.price} ${currency.toUpperCase()}`,
  y: [
    { label: 'SUM', value: `${currentItem.sum} ${type.toUpperCase()}` }
  ]
})

function addSumToPositionsArray (positionsArray) {
  const [ initial ] = positionsArray
  const oneArrayElement = 1
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
    const { type, width, height, ratio, currency, coin } = this.props
    const margin = { left: 0, right: 0, top: 20, bottom: 0 }

    const showGrid = true
    const gridHeight = height - margin.top - margin.bottom
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {}

    const ascSortedBids = this.props.bids.sort((left, right) => left.price - right.price)
    const [ firstBid ] = ascSortedBids
    const summary = ascSortedBids.reduce((reducer, bid) => reducer + parseFloat(bid.amount), 0)

    let ascSortedAsks = addSumToPositionsArray(this.props.asks.sort((left, right) => left.price - right.price)).map(ask => ({ ...ask, type: 'ask' }))

    // reverse amounts
    const data = ascSortedBids.slice(oneArrayElement).reduce((reducer, bid) => {
      const sum = reducer[reducer.length - oneArrayElement].sum - parseFloat(bid.amount)
      return [ ...reducer, { ...bid, sum, type: 'bid' } ]
    }, [ { ...firstBid, type: 'bid', sum: summary } ]).concat(ascSortedAsks).sort((left, right) => left.price - right.price)

    const [ initialElement ] = ascSortedBids

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={margin}
        seriesName='deep'
        data={data}
        type={type}
        xAccessor={d => d.price}
        xScale={scaleLinear()}
        xExtents={data => [initialElement.price, max(data, d => d.price)]}
        displayXAccessor={d => d.price}
        clamp
      >
        <Chart
          id={0}
          yExtents={d => (d.type === 'bid') && d.sum}
        >
          <XAxis
            axisAt='top'
            orient='top'
            tickFormat={price => currency === 'mxn' ? floatStringToLocaleString(price, { currency }) : price}
            tickStroke='rgba(56, 69, 85, .8)'
            stroke='rgba(56, 69, 85, .6)'
            {...xGrid}
          />
          <AreaSeries
            yAccessor={d => (d.type === 'bid') && d.sum}
            stroke='rgba(134, 175, 107, .9)'
            fill='rgba(134, 175, 107, .4)'
          />
          <HoverTooltip
            tooltipContent={tooltipContent(coin, currency)}
            fontSize={15}
            fill='rgba(0, 0, 0, 0)'
            stroke='rgba(0, 0, 0, 0)'
            fontFill='#747F89'
            bgFill='rgba(0, 0, 0, 0)'
          />
        </Chart>
        <Chart
          id={1}
          yExtents={d => (d.type === 'ask') && d.sum}
        >
          <HoverTooltip
            tooltipContent={tooltipContent(coin, currency)}
            fontSize={15}
            fill='rgba(0, 0, 0, 0)'
            stroke='rgba(0, 0, 0, 0)'
            fontFill='#747F89'
            bgFill='rgba(0, 0, 0, 0)'
          />
          <AreaSeries
            yAccessor={d => (d.type === 'ask') && d.sum}
            stroke='rgba(186, 48, 64, .9)'
            fill='rgba(186, 48, 64, .4)'
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

export default fitWidth(AreaChartWithYPercent)
