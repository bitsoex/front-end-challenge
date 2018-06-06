import React, { Component } from 'react';

import { formatCurrency } from '../../../utils/utilities';
import './Market.css';
import TICKER_DATA from '../../../utils/ticker-mock-data';

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = { isSelected: false };

    this._toogleMarket = this._toogleMarket.bind(this);
  }

  _toogleMarket() {
    this.setState(prevState =>
      Object.assign({}, ...prevState, { isSelected: !prevState.isSelected }),
    );
  }

  render() {
    const book = this.props.book
    const market = TICKER_DATA[book]
    const secondCurrency = book.toUpperCase().split('_')[1]
    const bookFormatted = book.toUpperCase().replace('_', '/')
    const price = parseFloat(market.vwap)
    const priceTrend = market.vwap > market.last ? 'rising' : 'descending';
    const marketClass = this.state.isSelected ? 'market-selected' : '';
    return (
      <div className={`market ${marketClass}`} onClick={this._toogleMarket}>
        <div className="market-resume">
          <span className="market-book">{bookFormatted}</span>
          <div className={`market-price ${priceTrend}`}>
            <ArrowSVG />
            <span>${formatCurrency(price, 2)} {secondCurrency}</span>
          </div>
        </div>
        <div className="market-info">Chart</div>
      </div>
    );
  }
}

export default Market;

function ArrowSVG() {
  return (
    <svg className="market-arrow-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.83 5.66">
      <title>Order_selector</title>
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <polygon className="cls-1" points="3.83 2.83 0 0 0 5.66 3.83 2.83"/>
        </g>
      </g>
    </svg>
  );
}
