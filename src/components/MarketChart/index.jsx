import React, { Component } from 'react'
import classnames from 'classnames'

import { floatStringToLocaleString } from '../../lib/utils'

import './index.css'
import './animations.css'

const CURRENCY_POSITION = 1
const EMPTY_DATA = 0

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
    context.fillStyle = 'white'
    context.beginPath()
    context.moveTo(0, 100)
    context.lineTo(100, 20)
    context.lineTo(110, 30)
    context.lineTo(140, 40)
    context.lineTo(150, 10)
    context.stroke()
  }

  toggle () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { expanded } = this.state
    const { book, data, className } = this.props
    const [ lastTrade ] = data
    const currency = book.book.split('_')[CURRENCY_POSITION]
    const price = currency === 'mxn' ? floatStringToLocaleString(lastTrade.price, { minimumFractionDigits: 2 }) : lastTrade.price
    return (
      <div className={classnames('market-chart', className, { expanded })} onClick={this.toggle.bind(this)}>
        <div className='header'>
          <div>{book.book.replace('_', '/')}</div>
          <div className={lastTrade.makerSide}>
            <i className='material-icons'>{lastTrade.makerSide === 'sell' ? 'arrow_drop_up' : 'arrow_drop_down' }</i>
            {price} {currency}
          </div>
          <div className='time'>{lastTrade.createdAt}</div>
        </div>
        <div className='chart'>
          <canvas ref='chart' />
        </div>
      </div>
    )
  }
}

export default MarketChart
