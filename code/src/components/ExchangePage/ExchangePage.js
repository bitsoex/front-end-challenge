import React, { Component } from 'react';
import LastTrades from './LastTrades/LastTrades';
import Chart from './Chart/Chart';
import Header from './Header/Header';
import MarketsSideBar from './MarketsSideBar/MarketsSideBar';
import OrderBook from './OrderBook/OrderBook';
import './ExchangePage.css';

class ExchangePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: 'btc_mxn',
      websocket: new WebSocket('wss://ws.bitso.com'),
    };

    this._changeBook = this._changeBook.bind(this);
  }

  componentWillMount() {
    this._connectWebsocket();
  }

  componentWillUnmount() {
    this.state.websocket.close();
  }

  _connectWebsocket() {
    const { websocket } = this.state;
    websocket.onopen = () => {
      websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
      websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'diff-orders' }));
      websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'orders' }));
    };
  }

  _changeBook(book) {
    this.setState({ book });
  }

  render() {
    const { book, websocket } = this.state;
    return (
      <div className="page-container">
        <Header
          changeBook={this._changeBook}
          currentBook={book}
        />
        <div className="boxes-container">
          <div className="charts-container">
            <LastTrades
              book={book}
              websocket={websocket}
            />
            <div className="charts-children-container">
              <Chart />
              <OrderBook
                book={book}
                websocket={websocket}
              />
            </div>
          </div>
          <MarketsSideBar />
        </div>
      </div>
    );
  }
}

export default ExchangePage;
