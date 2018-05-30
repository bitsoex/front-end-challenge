import React, { Component } from 'react';
import { numberFormat } from "../utils";

/**
 * Header del mercado actual en donde se muestra informacion basica
 */
class NavbarMarket extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      infoBook: {"high":"145791.06","last":"145608.30","created_at":"2018-05-28T05:11:36+00:00","book":"btc_mxn","volume":"24.94106645","vwap":"144462.76312438","low":"145608.30","ask":"145960.33","bid":"144800.00"}
	    };
	}

	componentDidMount() {
	    fetch("https://api.bitso.com/v3/ticker/?book=btc_mxn")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            infoBook: result.payload
	          });
	        }
	      )
	}

	render() {
		const infoBook = this.state.infoBook;
		// Cual es la formula correcta para la variacion?
		const variation = (infoBook.bid - infoBook.vwap);
		const variation_percent = variation / infoBook.vwap;

		return <div class="navbar-market">
			<div class="market_selector">BTC/MXN</div>
			<div class="volume">Volumen 24 hrs. <span>{numberFormat(infoBook.volume)} BTC</span></div>
			<div class="high">Max. <span>{numberFormat(infoBook.high)} MXN</span></div>
			<div class="low">Min. <span>{numberFormat(infoBook.low)} MXN</span></div>
			<div class="variation">Variación <span>{numberFormat(variation.toFixed(2))}MXN ({variation_percent.toFixed(2)}%)</span></div>
		</div>;
	}
}

export default NavbarMarket;