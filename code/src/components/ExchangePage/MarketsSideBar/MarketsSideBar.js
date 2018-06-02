import React, { Component } from 'react';

import './MarketsSideBar.css';
import MARKETS_DATA from '../../../utils/books-mock-data'
import TICKER_DATA from '../../../utils/ticker-mock-data'

class MarketsSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: false,
    };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState(prevState =>
      Object.assign({}, ...prevState, { sideBarOpen: !prevState.sideBarOpen }),
    );
  }

  buildMarkets() {
    const books = MARKETS_DATA.payload.map((market) => market.book);
    return books.map((book) => {
      const market = TICKER_DATA[book]
      const toCurrency = book.toUpperCase().split('_')[1]
      const bookFormatted = book.toUpperCase().replace('_', '/')
      const price = parseFloat(market.vwap).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      const isRising = market.vwap > market.last
      return (
        <div key={book} className={book === 'eth_mxn' ? 'market active' : 'market'}>
          <div className="market-resume">
            <span className="market-book">{bookFormatted}</span>
            <div className={isRising ? 'market-price rising' : 'market-price descending'}>
              <svg className="market-arrow-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.83 5.66"><title>Order_selector</title><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><polygon class="cls-1" points="3.83 2.83 0 0 0 5.66 3.83 2.83"/></g></g></svg>
              <span>${price} {toCurrency}</span>
            </div>
          </div>
          <div className="market-info">Chart</div>
        </div>
      );
    });
  }

  render() {
    MARKETS_DATA.payload.forEach((market) => {
      console.log(market.book);
    });
    const width = this.state.sideBarOpen ? '250px' : '0';
    return (
      <div className="sidenav-wrapper">
        <div className="sidenav-toggle" onClick={this.toggleSideBar}>
          <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
          <span className="vertical-text">MERCADOS</span>
        </div>
        <div id="mySidenav" className="sidenav-content" style={{ width }}>
          <header className="markets-header">MERCADOS 24 HRS</header>
          {this.buildMarkets()}
        </div>
      </div>
    );
  }
}

export default MarketsSideBar;
