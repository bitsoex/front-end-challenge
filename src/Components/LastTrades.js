import React, { Component } from 'react';

import TableLastTrades from "./TableLastTrades";

/**
 * Maquetacion para el panel de ultimos trades
 */
class LastTrades extends Component {
	render() {
		return <div class="last-trades">
			<div class="title-lasttrades header">Últimos trades</div>
			<div><TableLastTrades/></div>
		</div>;
	}
}

export default LastTrades;