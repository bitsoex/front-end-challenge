import React, { Component } from 'react';
import axios from 'axios';

import { formatCurrency } from '../../../../utils/utilities';
import './NavbarConversionRate.css';

class NavbarConversionRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: 'btc_mxn',
      price: 0,
    };

    this._ticker = this._ticker.bind(this);
  }

  componentWillMount() { this._ticker(); }

  componentDidMount() {
    this._timer = setInterval(this._ticker, 5000);
  }

  componentWillUnmount() { clearInterval(this._timer); }

  _ticker() {
    axios.get(`https://api.bitso.com/v3/ticker?book=${this.state.book}`)
      .then((response) => {
        const price = parseFloat(response.data.payload.vwap);
        this.setState({ price });
      });
  }

  render() {
    const { book, price } = this.state;
    const currencies = book.toUpperCase().split('_');
    const base = currencies[0];
    const second = currencies[1];
    const formattedPrice = formatCurrency(price, 2);
    return (
      <div id="navbar-conversion-rate">
        1{base} = {formattedPrice} {second}
      </div>
    );
  }
}

export default NavbarConversionRate;
