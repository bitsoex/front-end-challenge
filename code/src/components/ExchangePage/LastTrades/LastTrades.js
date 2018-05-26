import React, { Component } from 'react';
import './LastTrades.css';

class LastTrades extends Component {
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
            <tr className="trades-active">
              <td className="trades-hour">16:10:25</td>
              <td className="trades-buy-price">319,149.90</td>
              <td className="trades-amount">1.090484</td>
            </tr>
            <tr>
              <td className="trades-hour">16:10:25</td>
              <td className="trades-buy-price">319,149.90</td>
              <td className="trades-amount">1.090484</td>
            </tr>
            <tr>
              <td className="trades-hour">16:10:25</td>
              <td className="trades-sell-price">319,149.90</td>
              <td className="trades-amount">42.0903</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default LastTrades;
