import React from 'react'
import PropTypes from 'prop-types'

import { scaleLinear, scalePoint } from 'd3-scale'
import { curveMonotoneX } from 'd3-shape'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { AreaSeries } from 'react-stockcharts/lib/series'
import { XAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils'

const FIRST_TRADE = 0
const NORMALIZE_INDEX = 1
const DEFAULT_WIDTH = 980
const DEFAULT_HEIGHT = 300

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#b5d0ff', 0.2) },
  { stop: 0.7, color: hexToRGBA('#6fa4fc', 0.4) },
  { stop: 1, color: hexToRGBA('#4286f4', 0.8) }
])

class AreaChart extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
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
    const {
      data,
      type,
      width,
      height,
      ratio
    } = this.props

    const margin = { left: 0, right: 0, top: 20, bottom: 0 }
    const showGrid = true
    const gridHeight = 300 - margin.top - margin.bottom

    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {}

    const firstBid = data.bids[FIRST_TRADE]
    const bids = data.bids.slice(NORMALIZE_INDEX).reduce((reducer, bid) => {
      const lastItem = reducer[reducer.length - NORMALIZE_INDEX]
      return [
        ...reducer,
        {
          ...bid,
          sum: lastItem.sum + parseFloat(bid.amount)
        }
      ]
    }, [{ ...firstBid, sum: parseFloat(firstBid.amount) }]).reverse()

    console.warn(bids)
    const highestBidPrice = bids.reduce((reducer, bid) => bid.price > reducer ? bid.price : reducer, 0)
    const lowestBidPrice = bids.reduce((reducer, bid) => bid.price < reducer ? bid.price : reducer, firstBid.price)

    return (
      <ChartCanvas ratio={ratio} width={width} height={height}
        margin={margin}
        seriesName='positions'
        data={bids}
        type={type}
        xAccessor={d => d.price}
        xScale={scaleLinear()}
        flipXScale={false}
        xExtents={[highestBidPrice, lowestBidPrice]}
      >
        <Chart id={0} yExtents={d => [0, d.sum]} yScale={scalePoint()}>
          <defs>
            <linearGradient id='MyGradient' x1='0' y1='100%' x2='0' y2='0%'>
              <stop offset='0%' stopColor='#b5d0ff' stopOpacity={0.2} />
              <stop offset='70%' stopColor='#6fa4fc' stopOpacity={0.4} />
              <stop offset='100%' stopColor='#4286f4' stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis
            axisAt='top'
            orient='top'
            ticks={8}
            stroke='#191e23'
            tickStroke='rgba(56, 69, 85, .6)'
            {...xGrid}
          />
          <AreaSeries
            yAccessor={d => d.close}
            strokeWidth={2}
            interpolation={curveMonotoneX}
            canvasGradient={canvasGradient}
            fill='url(#MyGradient)'
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

export default fitWidth(AreaChart)
