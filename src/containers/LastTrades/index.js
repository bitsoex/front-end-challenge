import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchLastTrades } from "../../api";
import { BookConsumer } from "../../context/Book";
import LastTrades from "../../components/LastTrades";

export default () => (
  <BookConsumer>
    {({ book }) => <LastTradesContainer book={book.book} />}
  </BookConsumer>
);

class LastTradesContainer extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired
  };

  state = { lastTrades: [] };

  shouldComponentUpdate(nextProps, nextState) {
    const { book } = this.props;
    const { lastTrades } = this.state;
    return (
      book !== nextProps.book ||
      lastTrades.length === 0 ||
      lastTrades[0].book !== nextState.lastTrades[0].book
    );
  }

  componentDidMount() {
    const { book } = this.props;
    this.fetchTrades(book);
  }

  componentDidUpdate(prevProps) {
    const { book } = this.props;
    const { lastTrades } = this.state;
    if (book !== prevProps.book || lastTrades.length === 0) {
      this.fetchTrades(book);
    }
  }

  fetchTrades = async book => {
    const lastTrades = await fetchLastTrades({ book });
    this.setState({ lastTrades });
  };

  fetchTrades2 = async book => fetchLastTrades({ book });

  render() {
    const { book } = this.props;
    const { lastTrades } = this.state;

    return <LastTrades book={book} lastTrades={lastTrades} />;
  }
}
