import React, { Component } from 'react';
import './Orders.css';

class Orders extends Component {
  render() {
    return (
      <section className="orders-container">
        <header className="orders-header">
          <div>POSTURAS DE COMPRA</div>
          <div>Bid 319,140.00</div>
        </header>
        <table className="orders-table">
          <thead>
            <tr>
              <th></th>
              <th>SUM</th>
              <th>MONTO</th>
              <th>VALOR</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody className="orders-table-body">
            <tr>
              <td></td>
              <td>1.09</td>
              <td>1.093423</td>
              <td>2,307,984.29</td>
              <td className="orders-price">319,149.90</td>
            </tr>
            <tr>
              <td></td>
              <td>1.10</td>
              <td>0.093423</td>
              <td>2,307,984.29</td>
              <td className="orders-price">319,149.90</td>
            </tr>
            <tr>
              <td></td>
              <td>3.32</td>
              <td>42.0903</td>
              <td>2,307,984.29</td>
              <td className="orders-price">319,149.90</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Orders;
