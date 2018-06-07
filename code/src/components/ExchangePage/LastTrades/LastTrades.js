import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import LastTradesTable from './LastTradesTable/LastTradesTable';
import './LastTrades.css';

class LastTrades extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tradesData: {
        isFirstFetch: undefined,
        trades: [],
      },
      tradesLimit: 30,
    };
  }

  componentWillMount() { this._fetchLastTrades(); }

  componentDidMount() {
    this._receiveNewTradesMessage();
  }

  _receiveNewTradesMessage() {
    const { websocket } = this.props;
    websocket.onmessage = (message) => {
      const { book, type, payload } = JSON.parse(message.data);

      if (type === 'trades' && payload) {
        const newTrades = payload.map((trade) => {
          const { a, i, r, t } = trade;
          const tradeType = t === 0 ? 'buy' : 'sell';
          return {
            amount: a,
            book,
            created_at: new Date().toISOString(),
            maker_side: tradeType,
            price: r,
            tid: i,
          };
        });
        const oldTrades = this.state.tradesData.trades;
        const trades = oldTrades
          .concat(newTrades)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, this.state.tradesLimit);
        const tradesData = {
          trades,
          isFirstFetch: false,
        };
        this.setState({ tradesData });
      }
    };
  }

  _fetchLastTrades() {
    const { book } = this.props;
    const { tradesLimit } = this.state;
    axios.get(`https://api.bitso.com/v3/trades?book=${book}&limit=${tradesLimit}`)
      .then((response) => {
        const tradesData = {
          trades: response.data.payload,
          isFirstFetch: true,
        };
        this.setState({ tradesData });
      });
  }

  render() {
    return (
      <section className="trades-container">
        <header className="trades-header">ÚLTIMOS TRADES</header>
        <LastTradesTable
          tradesData={this.state.tradesData}
          book={this.props.book} />
      </section>
    );
  }
}

LastTrades.propTypes = {
  book: PropTypes.string.isRequired,
  websocket: PropTypes.object.isRequired,
};

export default LastTrades;
