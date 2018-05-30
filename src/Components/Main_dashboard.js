import React, { Component } from 'react';

import Navbar_market from './Navbar_market';
import Last_trades from './Last_trades';
import Market_page from './Market_page';
import Markets_list from './Markets_list';

/**
 * Maquetacion del dashboard principal para el libro actual
 */
class Main_dashboard extends Component {
	render() {
		return <div class="maindashboard">
			<Navbar_market/>
			<Last_trades/>
			<Market_page/>
			<Markets_list/>
		</div>
	}
}

export default Main_dashboard;