import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import {formatCurrency} from '../util/formatNumbers'

const NDECIMALS = 8;

function TradesList(props) {
	const trades = props.trades;
	//console.log("render numbers", props);
	const listItems = trades.map((rowData, index) =>{
		const time = new Date(rowData.created_at).toLocaleTimeString();
		const price = rowData.price;
		const number =  parseFloat(rowData.amount);
		const numberString = number.toString();
		const key = numberString + "_" + index;
		const numberWithZeros = number.toFixed(NDECIMALS);
		const zeros = numberWithZeros.slice(numberString.length);
		const price_color = rowData.maker_side == "buy" ? "red": "green";
		const classActive = index ? "" : "active";
		return (<tr key={key} className={classActive}> 
				<td className="timeTrades">{time}</td>
				<td className={"price " + price_color}>{formatCurrency(price, true)}</td>
				<td className="amount">{number}<span className="zeros">{zeros}</span></td>
			</tr>);
		
	});
	  
	return (
		<tbody>{listItems}</tbody>
	);
}

class TradesTable extends Component {

	render() {
		//console.log("Render TradesTable", this.props);
		return (
			<table className="trades">
				<thead>
					<tr>
						<th colSpan="3" className="block">
						ÚLTIMOS TRADES
						</th>
					</tr>
					 <tr>
						<td className="timeTrades">HORA</td>
						<td>
							<span className="label">MXN</span>
							<span>PRECIO</span>
						</td>
						<td className="amount"><span className="label">BTC</span>
							<span>MONTO</span></td>
					  </tr>
				</thead>
				<TradesList trades={this.props.trades} />
			</table>
		);
   }
}
export default TradesTable