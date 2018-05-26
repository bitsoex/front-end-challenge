import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OrderItem from 'components/OrderItem'

import './style.less'

function Order({ orders, title, type, selectedBook }) {
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
          <span>{selectedBook.from}</span>MONTO
        </p>
        <p>
          <span>{selectedBook.to}</span>VALOR
        </p>
        <p>
          <span>{selectedBook.to}</span>PRECIO
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
          />
        ))}
    </div>
  )
}

Order.propTypes = {
  orders: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  selectedBook: PropTypes.object
}

function mapStateToProps({ orders, selectedBook }) {
  return { orders, selectedBook }
}

export default connect(mapStateToProps)(Order)
