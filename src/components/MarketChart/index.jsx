import React, { Component } from 'react'
import moment from 'moment-timezone'
import classnames from 'classnames'

import { floatStringToLocaleString } from '../../lib/utils'

import './index.css'
import './animations.css'

const CURRENCY_POSITION = 1
const EMPTY_DATA = 0
const TO_ARRAY_INDEX = 1
const FIRST_POINT = 0
const FIRST_TRADE = 0

class MarketChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  componentDidMount () {
    if (this.props.data.length === EMPTY_DATA) return false
    let { data } = this.props
    const context = this.refs.chart.getContext('2d')
    const firstTrade = data[FIRST_TRADE]
    const lastTrade = data[data.length - TO_ARRAY_INDEX]

    data = data.filter(trade => trade.makerSide === lastTrade.makerSide)

    const highestPrice = data.reduce((reducer, trade) => trade.price > reducer ? trade.price : reducer, 0)
    const duration = moment(lastTrade.createdAt).unix() - moment(firstTrade.createdAt).unix()

    const points = data.map(trade => {
      const time = moment(trade.createdAt).unix() - moment(firstTrade.createdAt).unix()
      const x = (this.refs.chart.width * time) / duration
      const y = (this.refs.chart.height * trade.price) / highestPrice
      return { x, y }
    })

    context.strokeStyle = lastTrade.makerSide === 'sell' ? '#80C156' : '#CC4458'
    context.beginPath()
    context.moveTo(points[FIRST_POINT].x, points[FIRST_POINT].y)
    points.slice(1).forEach(point => {
      context.lineTo(point.x, point.y)
    })

    context.lineWidth = 0.1
    context.stroke()

    console.warn(points)
  }

  toggle () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { expanded } = this.state
    const { book, data, className } = this.props
    const lastTrade = data[data.length - TO_ARRAY_INDEX]
    const currency = book.book.split('_')[CURRENCY_POSITION]
    const price = currency === 'mxn' ? floatStringToLocaleString(lastTrade.price, { minimumFractionDigits: 2 }) : lastTrade.price

    const chartWidth = data.filter(trade => trade.makerSide === lastTrade.makerSide).length * 2
    return (
      <div className={classnames('market-chart', className, { expanded })} onClick={this.toggle.bind(this)}>
        <div className='header'>
          <div>{book.book.replace('_', '/')}</div>
          <div className={lastTrade.makerSide}>
            <i className='material-icons'>{lastTrade.makerSide === 'sell' ? 'arrow_drop_up' : 'arrow_drop_down' }</i>
            {price} {currency}
          </div>
          <div className='time'>{moment(lastTrade.createdAt).tz('America/Mexico_City').format('h:mm a')}</div>
        </div>
        <div className='chart'>
          <canvas ref='chart' height={1} width={chartWidth} />
        </div>
      </div>
    )
  }
}

export default MarketChart
