import React, { Component } from 'react';
import Time from 'react-time';
import { grayzeros, percentAmount, numberFormat } from "../utils";
import _ from 'lodash';

/**
 * Tabla de ordenes de venta
 */
class TableOrderBookBids extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      sumAmount: 0
	    };
	}

	sumAmount(amount) {
		this.state.sumAmount += parseFloat(amount);
		return this.state.sumAmount.toFixed(2);
	}

	render() {
		let sum = 0;
		const maxAmount = _.maxBy(this.props.orderbook, "amount").amount;
		return <table class="table">
			<thead>
				<tr>
					<th class="percent"></th>
					<th>SUM</th>
					<th><span class="dark_text">BTC</span> monto</th>
					<th><span class="dark_text">MXN</span> valor</th>
					<th><span class="dark_text">MXN</span> precio</th>
				</tr>
			</thead>
			<tbody>
			{this.props.orderbook.map(item => (
				<tr>
					<td class="percent">{percentAmount( item.amount, maxAmount )}</td>
					<td class="sum">{numberFormat(this.sumAmount(item.amount))}</td>
					<td class="mount">{grayzeros(numberFormat(item.amount))}</td>
					<td class="value">{numberFormat((item.amount*item.price).toFixed(2))}</td>
					<td class="price">{numberFormat(item.price)}</td>
				</tr>
	       	))}
			</tbody>
		</table>;
	}
}

export default TableOrderBookBids;