import React, { Component } from 'react'
import moment from 'moment-timezone'
import classnames from 'classnames'

import { floatStringToLocaleString } from '../../lib/utils'

import './index.css'
import './animations.css'

const CURRENCY_POSITION = 1
const EMPTY_DATA = 0
const NORMALIZE_INDEX = 1
const CHART_PADDING = 20

class MarketChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  componentDidMount () {
    if (this.props.data.length === EMPTY_DATA) return false
    const { data } = this.props
    const chartHeight = this.refs.chart.height - CHART_PADDING
    const widthInitial = CHART_PADDING
    const [ firstTrade ] = data
    const highestPrice = data.reduce((reducer, trade) => trade.price > reducer ? trade.price : reducer, 0)
    const context = this.refs.chart.getContext('2d')
    context.strokeStyle = '#fff'
    context.beginPath()
    context.moveTo(widthInitial, chartHeight)
    this.props.data.forEach(trade => {
      const x = moment(firstTrade.createdAt).unix() - moment(trade.createdAt).unix()
      const y = highestPrice - trade.price
      context.lineTo(x, y)
    })
    context.stroke()
    // context.beginPath()
    // context.moveTo(0, this.refs.chart.height)
    // context.lineTo(100, 20)
    // context.lineTo(110, 30)
    // context.lineTo(140, 40)
    // context.lineTo(150, 10)
    // context.stroke()
  }

  toggle () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { expanded } = this.state
    const { book, data, className } = this.props
    const [ lastTrade ] = data
    const firstTrade = data[data.length - NORMALIZE_INDEX]
    const currency = book.book.split('_')[CURRENCY_POSITION]
    const price = currency === 'mxn' ? floatStringToLocaleString(lastTrade.price, { minimumFractionDigits: 2 }) : lastTrade.price

    const highestPrice = data.reduce((reducer, trade) => trade.price > reducer ? trade.price : reducer, 0)
    const duration = moment(lastTrade.createdAt).unix() - moment(firstTrade.createdAt).unix()

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
          <canvas ref='chart' height={highestPrice + CHART_PADDING} width={duration + CHART_PADDING} />
        </div>
      </div>
    )
  }
}

export default MarketChart
