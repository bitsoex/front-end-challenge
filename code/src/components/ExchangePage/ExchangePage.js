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
    };
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="boxes-container">
          <div className="charts-container">
            <LastTrades book={this.state.book} />
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
