import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import LastTradesTable from './LastTradesTable/LastTradesTable';
import './LastTrades.css';

class LastTrades extends Component {
  constructor(props) {
    super(props);

    this.state = { trades: [] };
    this._fetchLastTrades = this._fetchLastTrades.bind(this);
  }

  componentWillMount() { this._fetchLastTrades(); }

  componentDidMount() {
    this._timer = setInterval(this._fetchLastTrades, 5000);
  }

  componentWillUnmount() { clearInterval(this._timer); }

  _fetchLastTrades() {
    axios.get(`https://api.bitso.com/v3/trades?book=${this.props.book}&limit=100`)
      .then((response) => {
        const trades = response.data.payload;
        this.setState({ trades });
      });
  }

  render() {
    return (
      <section className="trades-container">
        <header className="trades-header">ÚLTIMOS TRADES</header>
        <LastTradesTable
          trades={this.state.trades}
          book={this.props.book} />
      </section>
    );
  }
}

LastTrades.propTypes = {
  book: PropTypes.string.isRequired,
};

export default LastTrades;
