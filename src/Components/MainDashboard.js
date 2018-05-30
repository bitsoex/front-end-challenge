import React, { Component } from 'react';

import NavbarMarket from './NavbarMarket';
import LastTrades from './LastTrades';
import MarketPage from './MarketPage';
import MarketsList from './MarketsList';

/**
 * Maquetacion del dashboard principal para el libro actual
 */
class MainDashboard extends Component {
	render() {
		return <div class="maindashboard">
			<NavbarMarket/>
			<LastTrades/>
			<MarketPage/>
			<MarketsList/>
		</div>
	}
}

export default MainDashboard;