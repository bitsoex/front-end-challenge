import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { toFixed } from 'lib/constants'
import './style.less'

class OrderItem extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    orderId: PropTypes.string,
    rate: PropTypes.number,
    amount: PropTypes.number,
    transaction: PropTypes.number
  }

  state = {
    className: '--new'
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const className = this.props.value > prevProps.value ? '--up' : '--down'
      this.setState({
        className
      })
    }
  }

  render() {
    const { orderId, rate, amount, value, transaction } = this.props
    return (
      <div key={orderId} className={`item --order ${this.state.className}`}>
        <p />
        <p>{transaction}</p>
        <p>{toFixed(amount, 8)}</p>
        <p>{toFixed(value, 2)}</p>
        <p className="price">{toFixed(rate, 2)}</p>
      </div>
    )
  }
}

export default OrderItem
