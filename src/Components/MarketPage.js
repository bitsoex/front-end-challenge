import React, { Component } from 'react';

import OrderBook from './OrderBook.js';
import ChartTrade from './ChartTrade.js';

/**
 * Pagina principal del mercado para mostrar el libro de ordenes y la grafica
 */
class MarketPage extends Component {
	render() {
		return <div class="market-page">
			<ChartTrade/>
			<OrderBook/>
		</div>;
	}
}

export default MarketPage;