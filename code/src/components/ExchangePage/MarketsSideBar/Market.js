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
        <MarketChart priceTrend={priceTrend}/>
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

function MarketChart({ width = 198, height = 50, priceTrend }) {
  // Defines the color chart
  const primaryColor = priceTrend === 'rising' ? '#80C156' : '#CC4458';
  const secondaryColor = '#161A1E';

  // Defines the origin point
  const N = 24;
  const y0 = Math.floor(Math.random() * height + 1);
  const x0 = 0;
  const origin = [`M ${x0} ${y0}`]

  // steps on x
  const xs = Array.apply(null, {length: N}).map(Number.call, Number)
  const xss = xs.map(x => width / N * (x + 1)).sort((a, b) => a - b)

  // steps on y
  const ys = Array.apply(null, {length: N}).map(Function.call, Math.random)
  const yss = ys.map(y => Math.floor(y * height + 1))

  // steps on x, y
  const steps = xss.map((x, i) => {
    let y = yss[i]
    if(i == 23) y = priceTrend === 'rising' ? 0 : height;
    return { x, y }
  });

  // Builds the commands to draw the svg path
  const pathSteps = steps.map(s => `L ${s.x} ${s.y}`)
  const d = origin.concat(pathSteps).join(' ')

  // Build half steps
  const halfStep = (a, b) => a + ((b - a) / 2);
  const xhs = xss.map(x => x - width / N / 2);
  const yhs = yss.map((y, i) => {
    const y00 = yss[i - 1];
    if(i === 0) {
      return halfStep(y0, y);
    } else if(i === 23) {
      const y1 = priceTrend === 'rising' ? 0 : height;
      return halfStep(y00, y1);
    }
    return halfStep(y00, y);
  });

  const halfSteps = xhs.map((x, i) => {
    let y = yhs[i]
    return { x, y }
  });

  // Build the pointers
  const pointers = steps.concat(halfSteps).map(s => {
    return (
      <g key={s.x}>
        <line className="chart-line" x1={s.x} y1="0" x2={s.x} y2={height} stroke={secondaryColor} strokeWidth={1.8} />
        <circle className="chart-point" cx={s.x} cy={s.y} r="1" fill={primaryColor} />
      </g>
    );
  });
  return (
    <div className="market-info">
      <span className="market-chart-time dark-text">4:44 AM</span>
      <svg className="market-chart" width={width} height={height}>
        {pointers}
        <path d={d} stroke={primaryColor} strokeWidth={2} fill="none" />
      </svg>
    </div>
  );
}
