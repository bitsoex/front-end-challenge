import React, { Component } from 'react';

import Orders from './Orders/Orders';
import './OrderBook.css';

class OrderBook extends Component {
  render() {
    return (
      <div className="order-book">
        <Orders />
        <Orders />
      </div>
    );
  }
}

export default OrderBook;
