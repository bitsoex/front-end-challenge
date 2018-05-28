// based on react stockcharts example:
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'

import { floatStringToLocaleString } from '../../lib/utils'

const dateFormat = timeFormat('%Y-%m-%d')
const parseDate = timeParse('%Y-%m-%d')
const numberFormat = format('.2f')
const DEFAULT_WIDTH = 980
const DEFAULT_HEIGHT = 300

const parseData = (parse) => (d) => ({
  date: parse(d.date),
  open: +d.open,
  high: +d.high,
  low: +d.low,
  close: +d.close,
  volume: +d.volume
})

const tooltipContent = (type, currency) => ({ currentItem, xAccessor }) => ({
  x: dateFormat(xAccessor(currentItem)),
  y: [
    {
      label: 'open',
      value: currentItem.open && `${floatStringToLocaleString(currentItem.open, { minimunFractionDigits: 2 })} ${currency.toUpperCase()}`
    },
    {
      label: 'high',
      value: currentItem.high && `${floatStringToLocaleString(currentItem.high, { minimunFractionDigits: 2 })} ${currency.toUpperCase()}`
    },
    {
      label: 'low',
      value: currentItem.low && `${floatStringToLocaleString(currentItem.low, { minimunFractionDigits: 2 })} ${currency.toUpperCase()}`
    },
    {
      label: 'close',
      value: currentItem.close && `${floatStringToLocaleString(currentItem.close, { minimunFractionDigits: 2 })} ${currency.toUpperCase()}`
    },
    {
      label: 'vol',
      value: currentItem.close && `${floatStringToLocaleString(currentItem.close, { minimunFractionDigits: 2 })} ${type.toUpperCase()}`
    }
  ]
})

class CandleStickChart extends Component {
  static defaultProps = {
    type: 'hybrid'
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
  }

  render () {
    let {
      type,
      data: initialData,
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
      ratio,
      coin,
      currency
    } = this.props

    initialData = initialData.map(parseData(parseDate))

    // remove some of the data to be able to see
    // the tooltip resize
    const margin = { left: 0, right: 40, top: 20, bottom: 0 }

    const gridHeight = 250 - margin.top - margin.bottom
    const gridWidth = width - margin.left - margin.right

    const showGrid = true
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {}
    const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {}

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData)

    const lastData = last(data)
    const highest = data[Math.max(0, data.length - 150)]
    const start = xAccessor(lastData)
    const end = xAccessor(highest)
    const xExtents = [start, end]

    return (
      <ChartCanvas
        height={height}
        width={width}
        margin={margin}
        ratio={ratio}
        type={type}
        seriesName='MSFT'
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        clamp
      >
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low]]}
          padding={{ top: 10, bottom: 20 }}
          height={230}
        >
          <XAxis
            axisAt='top'
            orient='top'
            tickStroke='rgba(56, 69, 85, .6)'
            stroke='rgba(56, 69, 85, .4)'
            {...xGrid}
          />

          <YAxis
            axisAt='right'
            orient='right'
            tickFormat={numberFormat}
            {...yGrid}
            stroke='#191e23'
            tickStroke='rgba(56, 69, 85, .6)'
          />

          <CandlestickSeries
            fill={d => (d.close > d.open ? 'rgba(134, 175, 107, .4)' : 'rgba(186, 48, 64, .4)')}
            stroke={d => (d.close > d.open ? '#80C156' : '#BA3040')}
            wickStroke={d => (d.close > d.open ? '#80C156' : '#BA3040')}
          />

          <HoverTooltip
            tooltipContent={tooltipContent(coin, currency)}
            fontSize={15}
            fill='rgba(56, 69, 85, .7)'
            stroke='#4E5863'
            fontFill='#B0BAC1'
            bgFill='rgba(0, 0, 0, .2)'
          />
        </Chart>
        <Chart
          id={2}
          yExtents={[d => d.volume]}
          height={50}
          origin={(w, h) => [0, h - 50]}
        >
          <BarSeries
            yAccessor={d => d.volume}
            fill='rgba(56, 69, 85, .4)'
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

export default fitWidth(CandleStickChart)
