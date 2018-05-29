import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchOrderBook } from "../../api";
import { BookConsumer } from "../../context/Book";

export default () => (
  <BookConsumer>{({ book }) => <OrderBook book={book.book} />}</BookConsumer>
);

class OrderBook extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired
  };

  state = {
    asks: [],
    bids: []
  };

  componentDidMount() {
    const { book } = this.props;
    this.fetchTrades(book);
  }

  componentDidUpdate(prevProps) {
    const { book } = this.props;
    if (book !== prevProps.book) {
      this.fetchOrderBook(book);
    }
  }

  fetchOrderBook = async book => {
    const orderBook = await fetchOrderBook({ book });
    console.log(orderBook);
  };

  render() {
    const { book } = this.props;
    const { asks, bids } = this.state;

    return this.props.children({ book, asks, bids });
  }
}
