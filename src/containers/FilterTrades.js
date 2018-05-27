import { connect } from 'react-redux'
import LastTradesTable from '../components/LastTradesTable'
import PosturaCompraTable from '../components/PosturaCompraTable'
import PosturaVentaTable from '../components/PosturaVentaTable'
import ChartBidsAsks from '../components/ChartBidsAsks'
import {
    LOAD_TRADES,
    LOAD_HISTORY_TRADES
} from '../reducers/types';

const mapDispatchToProps = dispatch => {
	console.log("connect.method.ping FilterBooks", dispatch);
	return {
		changePeriodInterval : (book, period, interval) => dispatch({
			type : LOAD_HISTORY_TRADES,
			book: book,
			period: period,
			interval: interval
		})
	}
}

const mapStateToPropsBidsAsksHistoryTrades = state => {
	//console.log("Filtering", state);
	const {bookSelected} = state.booksReducer;
	const {historytrades, selectedPeriod} = state.historyTradeReducer;
	const {bids, asks} = state.websocketReducer;
	const bidsClone = bids.slice(0);
	const asksClone = asks.slice(0);
	const bidsR = bidsClone.reverse();
	const difference = bids[0] && asks[0] ? Math.abs(bids[0].r -  asks[0].r) : -1;
	return {bids: bidsR, asks: asksClone, bookSelected, historytrades, difference, selectedPeriod};
}

const loadTrades = () => {
	//console.log("connect.method.ping FilterTrades");
	return ({ type: LOAD_TRADES, trades: [] })
};

const mapStateToProps = state => {
	//console.log("state.FilterTrades", state);
	const {bookSelected} = state.booksReducer;
	return {...state.tradesReducer, bookSelected};
}
const mapStateToProps2 = state => {
	//console.log("state.FilterTrades", state);
	const {bookSelected} = state.booksReducer;
	return {...state.websocketReducer, bookSelected};
}

export const FilterTrades = connect(
	mapStateToProps,
	{loadTrades}
)(LastTradesTable);

export const FilterBids = connect(
	mapStateToProps2,
	{loadTrades}
)(PosturaCompraTable);

export const FilterAsks = connect(
	mapStateToProps2,
	{loadTrades}
)(PosturaVentaTable);

export const FilterLineChart = connect(
	mapStateToPropsBidsAsksHistoryTrades,
	mapDispatchToProps
)(ChartBidsAsks);