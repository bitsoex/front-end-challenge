import React, { Component } from 'react';
import LastTrades from './LastTrades/LastTrades';
import Chart from './Chart/Chart';
import Header from './Header/Header';
import MarketsSideBar from './MarketsSideBar/MarketsSideBar';
import OrderBook from './OrderBook/OrderBook';
import './ExchangePage.css';
import TRADES_DATA from '../../utils/trades-mock-data';

class ExchangePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: 'btc_mxn',
    };
  }
  render() {
    let first = true;
    const trades = TRADES_DATA.payload.map((trade, index) => {
      if (index !== 0) first = false;
      const date = new Date(trade.created_at);
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      const hour = `${hours}:${minutes}:${seconds}`;
      const price = parseFloat(trade.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      const amount = parseFloat(trade.amount);
      return {
        id: trade.tid,
        hour,
        type: trade.maker_side,
        price,
        amount,
        first,
      };
    });
    return (
      <div className="page-container">
        <Header />
        <div className="boxes-container">
          <div className="charts-container">
            <LastTrades trades={trades} book={this.state.book} />
            <div className="charts-children-container">
              <Chart />
              <OrderBook book={this.state.book} />
            </div>
          </div>
          <MarketsSideBar />
        </div>
      </div>
    );
  }
}

export default ExchangePage;
