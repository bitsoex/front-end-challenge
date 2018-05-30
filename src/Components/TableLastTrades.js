import React, { Component } from 'react';
import Time from 'react-time';
import { grayzeros } from "../utils";

/**
 * Tabla de las ultimas ordenes completadas en el merado actual
 */
class TableLastTrades extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      trades: []
	    };
	}

	componentDidMount() {
	    fetch("https://api.bitso.com/v3/trades/?book=btc_mxn")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            trades: result.payload
	          });
	        }
	      )
	}

	render() {
		const { trades } = this.state;
		return <table class="table">
			<thead><tr><th>Hora</th><th><span class="dark_text">MXN</span> precio</th><th><span class="dark_text">BTC</span> monto</th></tr></thead>
			<tbody>
				{trades.map(item => (
					<tr class={item.maker_side}>
						<td><Time value={item.created_at} format="HH:mm:ss"/></td>
						<td class="price">{item.price}</td>
						<td class="mount">{grayzeros(item.amount)}</td>
					</tr>
		       	))}
			</tbody>
		</table>;
	}
}

export default TableLastTrades;