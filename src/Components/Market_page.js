import React, { Component } from 'react';

import Order_book from './Order_book.js';

class Market_page extends Component {
	render() {
		return <div class="market-page">
			<div class="chart-trade"></div>
			<Order_book/>
		</div>;
	}
}

export default Market_page;