import React from 'react'
import {formatCurrency} from '../util/formatNumbers'

function makeStock(posX, posY, mostLowxxx, mostHighxx, widthMax, heightMax, data) {
	if(data.length ==0)
		return (null);
	
	const mostHigh = getMostHigh(data);
	const mostLow = getMostLow(data);
	const distance = mostHigh - mostLow;
	const step = widthMax/(data.length+2);
	const operation = heightMax / distance;
	const widthStock = step * 0.8;
	let stepX = 0;
	let pathD = "M0 0 ";
	data.map((item, i)=>{
		const y1 = (item.high - mostLow)*operation;
		const y2 = (item.low - mostLow)*operation;
		const yOpen = (item.open - mostLow)*operation;
		const yClose = (item.close - mostLow)*operation;
		const height = item.open < item.close ? yClose - yOpen : yOpen - yClose;
		const y3 = item.open < item.close ? yOpen : yClose;
		const className = item.open < item.close ?  "green" : "red";
		stepX = stepX + step;
		pathD += "L"+stepX + " " + yClose + " ";
	});
	return (<path className="linechart_fill" d={pathD}/>);
}


	
function getMostHigh(data){
	let mostValue = data[0].close;
	data.map(item=>{
		if(item.close > mostValue )
			mostValue = item.close;
	});
	return mostValue;
}

function getMostLow(data){
	let mostValue = data[0].close;
	data.map(item=>{
		if(item.close < mostValue )
			mostValue = item.close;
	});
	return mostValue;
}

function getStatusData(data){
	if(data.length ==0)
		return "green";
	if(data[data.length-1].close > data[data.length-2].close)
		return "red";
	return "green";
}

function MarketItem(props) {
	const {data, action, historyData, mostHigh, mostLow, viewingBook} = props;
	const listItems = data.map((ticker, index) =>{
		const change = ticker.book.toUpperCase().split("_").join("/");
		const unit = ticker.book.toUpperCase().split("_")[1];
		//const classActive = index ? "red" : "green";
		const myBookData = historyData[ticker.book] ? historyData[ticker.book] : [];
		const classActive = getStatusData(myBookData);
		const price = parseFloat(ticker.high);
		
		const className = viewingBook == ticker.book ? "selected" : "";
		return [
			<tr key={ticker.book} onClick={e=>action(ticker.book)} className={"label " + className}> 
				<td>{change}</td>
				<td className={classActive} >{formatCurrency(price, unit, false)}</td>
			</tr>,
			<tr key={ticker.book + "_chart"} className={"charttr "+ className + " " + classActive} >
				<td colSpan="2">
					<svg className="chart" viewBox="0 0 200 100">
						<g >
							{makeStock(0 , 0, mostLow, mostHigh, 200, 100, myBookData )}
						</g>
					</svg>
				</td>
			</tr>
			];
	});
	  
	return (
		<tbody>{listItems}</tbody>
	);
}

class MarketTable extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state ={
			selected_book: ""
		};
	}
	
	changeSelectedBook(book){
		const { loadHistoryTrades } = this.props;
		loadHistoryTrades(book);
		this.setState({
			selected_book: book
		})
	}
	
	render(){
		const {tickers, backuptrades} = this.props;
		
		console.log("MARKET.TABLE", this.props);
		return(
			<table className="trades expandx">
				<thead>
					<tr>
						<th colSpan="3" className="block">
							MERCADOS 24 HORAS
						</th>
					</tr>
				</thead>
				<MarketItem data={tickers}  historyData={backuptrades} action={this.changeSelectedBook.bind(this)} viewingBook={this.state.selected_book}/>
			</table>
		);
	}
}

MarketTable.defaultProps = {
	tickers: []
}

export default MarketTable;