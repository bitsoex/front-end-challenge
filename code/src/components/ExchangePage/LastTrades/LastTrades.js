import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LastTrades.css';

class LastTrades extends Component {
  formatAmount(amount) {
    console.log(amount)
    const number = amount.toString().split('.');
    const afterPoint = number[1].length;
    if(afterPoint >= 8) {
      return (<td className="trades-amount">{amount.toFixed(8)}</td>);
    }
    return (
      <td className="trades-amount">
        {amount}
        <span className="dark-text">
          {'0'.repeat(8 - afterPoint)}
        </span>
      </td>);
  }
  buildRows() {
    return this.props.trades.map((trade) => {
      const { id, hour, type, price, amount, first } = trade;
      return (
        <tr key={id} className={first ? 'trades-active' : ''}>
          <td className="trades-hour">{hour}</td>
          <td className={type === 'buy' ? 'trades-buy-price' : 'trades-sell-price'}>{price}</td>
          {this.formatAmount(amount)}
        </tr>
      );
    });
  }

  render() {
    const currencies = this.props.book.toUpperCase().split('_');
    const base = currencies[0];
    const second = currencies[1];
    return (
      <section className="trades-container">
        <header className="trades-header">ÚLTIMOS TRADES</header>
        <table className="trades-table">
          <thead className="trades-table-head">
            <tr>
              <th>HORA</th>
              <th><span className="dark-text">{second}</span> PRECIO</th>
              <th><span className="dark-text">{base}</span> MONTO</th>
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

LastTrades.propTypes = {
  trades: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default LastTrades;
