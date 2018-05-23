import { connect } from 'react-redux'
import TradesTable from '../components/TradesTable'
import PosturaCompraTable from '../components/PosturaCompraTable'
import PosturaVentaTable from '../components/PosturaVentaTable'
import ChartToRender from '../components/graph/LineChart'

const LOAD_TRADES = 'LOAD_TRADES';

const ping = () => {
	console.log("connect.method.ping FilterTrades");
	return ({ type: LOAD_TRADES, trades: [] })
};

const mapStateToProps = state => {
	console.log("state.FilterTrades", state);
	return state.tradesReducer;
}
const mapStateToProps2 = state => {
	console.log("state.FilterTrades", state);
	return state.websocketReducer;
}

const mapStateToProps3 = state => {
	const {bids, asks} = state.websocketReducer;
	const bidsClone = bids.slice(0);
	const asksClone = asks.slice(0);
	const bidsR = bidsClone.reverse();

	return {bids: bidsR, asks: asksClone};
}


export const FilterTrades = connect(
	mapStateToProps,
	{ping}
)(TradesTable);

export const FilterBids = connect(
	mapStateToProps2,
	{ping}
)(PosturaCompraTable);

export const FilterAsks = connect(
	mapStateToProps2,
	{ping}
)(PosturaVentaTable);

export const FilterLineChart = connect(
	mapStateToProps3,
	{ping}
)(ChartToRender);