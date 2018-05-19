import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import './style.less'

class OrderItem extends PureComponent {
  state = {
    className: '--new'
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      console.log('UP OR DOWN')
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
        <p />
        <p>{amount}</p>
        <p>{parseFloat(Math.round(value * 100) / 100).toFixed(2)}</p>
        <p className="price">
          {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
        </p>
      </div>
    )
  }
}

function Order({ orders, title, type }) {
  return (
    <div className="orders-container">
      <div className="header">
        <p className="title">{title}</p>
        <p>
          <span>MXN</span> Bid 319140.00
        </p>
      </div>
      <div className="item --header">
        <p />
        <p>SUM</p>
        <p>
          <span>BTC</span>MONTO
        </p>
        <p>
          <span>MXN</span>VALOR
        </p>
        <p>
          <span>MXN</span>PRECIO
        </p>
      </div>
      {orders[type] &&
        orders[type].map(({ o, r, a, v, t }) => (
          <OrderItem
            key={o}
            orderId={o}
            rate={r}
            amount={a}
            value={v}
            transaction={t}
            // timestamp={d}
          />
        ))}
    </div>
  )
}

function mapStateToProps({ orders }) {
  return { orders: orders }
}

export default connect(mapStateToProps)(Order)
