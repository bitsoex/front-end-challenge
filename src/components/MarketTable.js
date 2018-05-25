import React from 'react'
import {formatCurrency} from '../util/formatNumbers'


function MarketItem(props) {
	const data = props.data;
	
	const listItems = data.map((ticker, index) =>{
		const change = ticker.book.toUpperCase().split("_").join("/");
		const unit = ticker.book.toUpperCase().split("_")[1];
		const classActive = index ? "red" : "green";
		const price = parseFloat(ticker.high);
		
		return (<tr key={ticker.book}> 
				<td>{change}</td>
				<td className={classActive} >{formatCurrency(price, unit, true)}</td>
			</tr>);
		
	});
	  
	return (
		<tbody>{listItems}</tbody>
	);
}

class MarketTable extends React.Component {
	
	render(){
		const {tickers} = this.props;
		return(
			<table className="trades expandx">
				<thead>
					<tr>
						<th colSpan="3" className="block">
							MERCADOS 24 HORAS
						</th>
					</tr>
				</thead>
				<MarketItem data={tickers} />
			</table>
		);
	}
}

MarketTable.defaultProps = {
	tickers: []
}

export default MarketTable;