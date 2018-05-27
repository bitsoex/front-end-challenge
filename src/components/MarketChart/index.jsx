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
    const context = this.refs.chart.getContext('2d')
    const { data } = this.props

    const sellTrades = data.filter(trade => trade.makerSide === 'sell')

    const sellFirstTrade = sellTrades[FIRST_TRADE]
    const sellLastTrade = sellTrades[sellTrades.length - TO_ARRAY_INDEX]
    const sellHighestPrice = sellTrades.reduce((reducer, trade) => trade.price > reducer ? trade.price : reducer, 0)
    const sellDuration = moment(sellLastTrade.createdAt).unix() - moment(sellFirstTrade.createdAt).unix()

    const sellPoints = sellTrades.map(trade => {
      const time = moment(trade.createdAt).unix() - moment(sellFirstTrade.createdAt).unix()
      const x = (this.refs.chart.width * time) / sellDuration
      const y = (this.refs.chart.height * trade.price) / sellHighestPrice
      return { x, y }
    })

    context.strokeStyle = '#80C156'
    context.beginPath()
    context.moveTo(sellPoints[FIRST_POINT].x, sellPoints[FIRST_POINT].y)
    sellPoints.slice(1).forEach(point => {
      context.lineTo(point.x, point.y)
    })

    context.lineWidth = 4
    context.stroke()

    const buyTrades = data.filter(trade => trade.makerSide === 'buy')

    const buyFirstTrade = buyTrades[FIRST_TRADE]
    const buyLastTrade = buyTrades[buyTrades.length - TO_ARRAY_INDEX]
    const buyHighestPrice = buyTrades.reduce((reducer, trade) => trade.price > reducer ? trade.price : reducer, 0)
    const buyDuration = moment(buyLastTrade.createdAt).unix() - moment(buyFirstTrade.createdAt).unix()

    const buyPoints = buyTrades.reverse().map(trade => {
      const time = moment(trade.createdAt).unix() - moment(buyFirstTrade.createdAt).unix()
      const x = (this.refs.chart.width * time) / buyDuration
      const y = (this.refs.chart.height * trade.price) / buyHighestPrice
      return { x, y }
    })

    context.strokeStyle = '#CC4458'
    context.beginPath()
    context.moveTo(sellPoints[FIRST_POINT].x, sellPoints[FIRST_POINT].y)
    buyPoints.slice(1).forEach(point => {
      context.lineTo(point.x, point.y)
    })

    context.lineWidth = 4
    context.stroke()

    console.warn(sellPoints)
    console.warn(buyTrades)
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
          <canvas ref='chart' height={10} width={chartWidth} />
        </div>
      </div>
    )
  }
}

export default MarketChart
