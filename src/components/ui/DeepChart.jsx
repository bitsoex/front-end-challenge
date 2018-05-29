// base on react stockcharts example:
// https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import React from 'react'
import PropTypes from 'prop-types'

import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { LineSeries, AreaSeries } from 'react-stockcharts/lib/series'

import { XAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'

function parseData (parse) {
  return function (d) {
    d.date = parse(d.date)
    d.open = +d.open
    d.high = +d.high
    d.low = +d.low
    d.close = +d.close
    d.volume = +d.volume

    return d
  }
}

const DEFAULT_WIDTH = 980
const DEFAULT_HEIGHT = 300

const parseDate = timeParse('%Y-%m-%d')

class LineAndScatterChartGrid extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
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
    let { data: initialData } = this.props
    const { type, width, height, ratio, interpolation } = this.props
    const { gridProps, seriesType } = this.props
    const margin = { left: 0, right: 40, top: 20, bottom: 0 }

    initialData = initialData.map(parseData(parseDate))

    const gridHeight = height - margin.top - margin.bottom

    const showGrid = true
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {}

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor
    } = xScaleProvider(initialData)

    const start = xAccessor(last(data))
    const end = xAccessor(data[Math.max(0, data.length - 150)])
    const xExtents = [start, end]

    const Series = seriesType === 'line' ? LineSeries : AreaSeries

    return (
      <ChartCanvas height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        type={type}
        seriesName='MSFT'
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={100}
          yExtents={d => [d.high, d.low]}
        >
          <XAxis
            axisAt='top'
            orient='top'
            tickStroke='rgba(56, 69, 85, .6)'
            stroke='rgba(56, 69, 85, .4)'
            {...gridProps}
            {...xGrid}
          />
          <MouseCoordinateX
            at='bottom'
            orient='bottom'
            displayFormat={timeFormat('%Y-%m-%d')} />
          <MouseCoordinateY
            at='right'
            orient='right'
            displayFormat={format('.2f')} />

          <Series
            yAccessor={d => d.close}
            interpolation={interpolation}
            stroke='#ff7f0e'
            fill='#ff7f0e'
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>

    )
  }
}

export default fitWidth(LineAndScatterChartGrid)
