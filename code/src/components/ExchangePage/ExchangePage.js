import React, { Component } from 'react';
import LastTrades from './LastTrades/LastTrades';
import Chart from './Chart/Chart';
import Header from './Header/Header';
import MarketsSideBar from './MarketsSideBar/MarketsSideBar';
import OrderBook from './OrderBook/OrderBook';
import './ExchangePage.css';

class ExchangePage extends Component {
  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="boxes-container">
          <div className="charts-container">
            <LastTrades />
            <div className="charts-children-container">
              <Chart />
              <OrderBook />
            </div>
          </div>
          <MarketsSideBar />
        </div>
      </div>
    );
  }
}

export default ExchangePage;
