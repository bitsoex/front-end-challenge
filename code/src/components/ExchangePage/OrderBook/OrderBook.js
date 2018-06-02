import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Orders from './Orders/Orders';
import './OrderBook.css';
import ORDER_BOOK_DATA from '../../../utils/orders-mock-data';

class OrderBook extends Component {
  render() {
    return (
      <div className="order-book">
        <Orders
        book={this.props.book}
        title="POSTURAS DE COMPRA"
        orders={ORDER_BOOK_DATA.payload.bids}
        type="bid" />
        <Orders
        book={this.props.book}
        title="POSTURAS DE VENTA"
        orders={ORDER_BOOK_DATA.payload.asks}
        type="ask" />
      </div>
    );
  }
}

Orders.propTypes = { book: PropTypes.string.isRequired };

export default OrderBook;
