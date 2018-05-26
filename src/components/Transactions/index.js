import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toFixed } from 'lib/constants'

import './style.less'

class Transactions extends PureComponent {
  static propTypes = {
    transactions: PropTypes.array
  }

  static defaultProps = {
    transactions: []
  }

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
            i,
            amount,
            r: rate,
            t: makerSide,
            maker_side,
            v: value,
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
              <p className="price">{toFixed(price || value, 2)}</p>
              <p>{toFixed(amount || rate)}</p>
            </div>
          )
        )}
      </div>
    )
  }
}

function mapStateToProps({ transactions }) {
  return { transactions }
}

export default connect(mapStateToProps)(Transactions)
