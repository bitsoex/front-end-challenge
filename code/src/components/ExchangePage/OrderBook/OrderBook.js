import React, { Component } from 'react';

import Orders from './Orders/Orders';
import './OrderBook.css';

const orders = [
  { id: 1, sum: 1.09, amount: 1.093423, value: 2307984.29, price: 319149.90 },
  { id: 2, sum: 1.10, amount: 0.093423, value: 2307984.29, price: 319149.90 },
  { id: 3, sum: 3.32, amount: 42.0903, value: 2307984.29, price: 319149.90 },
]

class OrderBook extends Component {
  render() {
    return (
      <div className="order-book">
        <Orders
        title="POSTURAS DE COMPRA"
        orders={orders}
        type="bid" />
        <Orders
        title="POSTURAS DE VENTA"
        orders={orders}
        type="ask" />
      </div>
    );
  }
}

export default OrderBook;
