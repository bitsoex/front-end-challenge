import React, { Component } from 'react';
import Time from 'react-time';
import { grayzeros, percentAmount, numberFormat } from "../utils";
import _ from 'lodash';

/**
 * Tabla de ordenes de compra
 */
class TableOrderBookAsks extends Component {

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
					<th><span class="dark_text">MXN</span> precio</th>
					<th><span class="dark_text">MXN</span> valor</th>
					<th><span class="dark_text">BTC</span> monto</th>
					<th>SUM</th>
					<th class="percent"></th>
				</tr>
			</thead>
			<tbody>
			{this.props.orderbook.map(item => (
				<tr>
					<td class="price">{numberFormat(item.price)}</td>
					<td class="value">{numberFormat((item.amount*item.price).toFixed(2))}</td>
					<td class="mount">{grayzeros(numberFormat(item.amount))}</td>
					<td class="sum">{numberFormat(this.sumAmount(item.amount))}</td>
					<td class="percent">{percentAmount( item.amount, maxAmount )}</td>
				</tr>
	       	))}
			</tbody>
		</table>;
	}
}

export default TableOrderBookAsks;