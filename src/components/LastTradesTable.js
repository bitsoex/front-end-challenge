import React, { Component } from 'react'
import {formatCurrency, formatNumber} from '../util/formatNumbers'


function TradesList(props) {
	const trades = props.trades;
	const unit = props.bookSelected.split("_")[1];
	//console.log("render numbers", props);
	const listItems = trades.map((rowData, index) =>{
		const time = new Date(rowData.created_at).toLocaleTimeString();
		const price = rowData.price;
		const {numbers, zeros } = formatNumber(rowData.amount);
		const key = numbers + "_" + index;
		const price_color = rowData.maker_side == "buy" ? "red": "green";
		const classActive = index ? "" : "active";
		return (<tr key={key} className={classActive}> 
				<td className="timeTrades">{time}</td>
				<td className={"price " + price_color}>{formatCurrency(price, unit, true )}</td>
				<td className="amount">{numbers}<span className="zeros">{zeros}</span></td>
			</tr>);
		
	});
	  
	return (
		<tbody>{listItems}</tbody>
	);
}

class LastTradesTable extends Component {

	render() {
		const {bookSelected} = this.props;
		const exchange = bookSelected.toUpperCase().split("_");
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
							<span className="label">{exchange[1]}</span>
							<span>PRECIO</span>
						</td>
						<td className="amount"><span className="label">{exchange[0]}</span>
							<span>MONTO</span></td>
					  </tr>
				</thead>
				<TradesList trades={this.props.trades} bookSelected={this.props.bookSelected}/>
			</table>
		);
   }
}
export default LastTradesTable