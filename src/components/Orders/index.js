import React from 'react'

import './style.less'

function Order({ orders, title }) {
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
      {orders.map(
        ({
          o: orderId,
          r: rate,
          a: amount,
          v: value,
          t: transaction,
          d: timestamp
        }) => (
          <div key={orderId + timestamp} className="item --order">
            <p />
            <p />
            <p>{amount}</p>
            <p>{parseFloat(Math.round(value * 100) / 100).toFixed(2)}</p>
            <p className="price">
              {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
            </p>
          </div>
        )
      )}
    </div>
  )
}

export default Order
