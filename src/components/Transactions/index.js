import React, { PureComponent } from 'react'

import './style.less'

class Transactions extends PureComponent {
  render() {
    const { transactions } = this.props
    return (
      <div className="transactions-container">
        <div className="header">
          <p className="title">Ultimos trades</p>
        </div>
        <div className="item --header">
          <p>Hora</p>
          <p>
            <span>MXN</span>Precio
          </p>
          <p>
            <span>BTC</span>Monto
          </p>
        </div>
        {transactions.length === 0 && <p>Esperando transacciones...</p>}
        {transactions.map(
          ({
            i, // a,
            amount,
            r: rate,
            t: makerSide,
            maker_side,
            v: value, // mo: makerOrderId,
            // to: takeOrderId,
            d,
            created_at,
            price,
            tid
          }) => (
            <div key={i || tid} className={`item --${makerSide || maker_side}`}>
              <p>
                {new Date(
                  Date.parse((d || created_at).split('+')[0])
                ).toLocaleTimeString('es')}
              </p>
              <p className="price">{price || value}</p>
              <p>{amount || rate}</p>
            </div>
          )
        )}
      </div>
    )
  }
}

Transactions.defaultProps = {
  transactions: []
}

export default Transactions
