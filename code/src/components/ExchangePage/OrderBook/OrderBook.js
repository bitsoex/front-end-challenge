import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Orders from './Orders/Orders';
import './OrderBook.css';
import ORDER_BOOK_DATA from '../../../utils/orders-mock-data';

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
      asks: [],
    };

    this._fetchOrderBook = this._fetchOrderBook.bind(this);
  }

  componentWillMount() {
    this._fetchOrderBook();
  }

  componentDidMount() {
    this._timer = setInterval(this._fetchOrderBook, 5000);
  }

  componentWillUnmount() { clearInterval(this._timer); }

  _fetchOrderBook() {
    axios.get(`https://api.bitso.com/v3/order_book?book=${this.props.book}`)
      .then((response) => {
        const { bids, asks } = response.data.payload;
        this.setState({ bids, asks });
      });
  }

  render() {
    const { book } = this.props;
    const { bids, asks } = this.state;
    return (
      <div className="order-book">
        <Orders
        book={book}
        title="POSTURAS DE COMPRA"
        orders={bids}
        type="bid" />
        <Orders
        book={book}
        title="POSTURAS DE VENTA"
        orders={asks}
        type="ask" />
      </div>
    );
  }
}

OrderBook.propTypes = { book: PropTypes.string.isRequired };

export default OrderBook;
