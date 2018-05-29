import React, { Component } from 'react';

import Order_book from './Order_book.js';
import Chart_trade from './Chart_trade.js';

class Market_page extends Component {
	render() {
		return <div class="market-page">
			<Chart_trade/>
			<Order_book/>
		</div>;
	}
}

export default Market_page;