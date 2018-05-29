import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LastTrades.css';

class LastTrades extends Component {
  buildRows() {
    return this.props.trades.map((trade) => {
      const { id, hour, type, price, amount, first } = trade;
      return (
        <tr key={id} className={first ? 'trades-active' : ''}>
          <td className="trades-hour">{hour}</td>
          <td className={type === 'buy' ? 'trades-buy-price' : 'trades-sell-price'}>{price}</td>
          <td className="trades-amount">{amount}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <section className="trades-container">
        <header className="trades-header">ÚLTIMOS TRADES</header>
        <table className="trades-table">
          <thead className="trades-table-head">
            <tr>
              <th>HORA</th>
              <th>PRECIO</th>
              <th>MONTO</th>
            </tr>
          </thead>
          <tbody className="trades-table-body">
            { this.buildRows() }
          </tbody>
        </table>
      </section>
    );
  }
}

LastTrades.propTypes = { trades: PropTypes.array.isRequired };

export default LastTrades;
