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
            <tr className="trades-buy trades-active">
              <td>16:10:25</td>
              <td className="trades-price">319,149.90</td>
              <td>1.090484</td>
            </tr>
            <tr className="trades-buy">
              <td>16:10:25</td>
              <td className="trades-price">319,149.90</td>
              <td>1.090484</td>
            </tr>
            <tr className="trades-sell">
              <td >16:10:25</td>
              <td className="trades-price">319,149.90</td>
              <td>42.0903</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default LastTrades;
