import { connect } from 'react-redux'
import MarketTable from '../components/MarketTable'
import { LOAD_HISTORY_TRADES} from '../reducers/types';

const loadHistoryTrades = (book) => {
	//console.log("connect.method.ping FilterTrades");
	const ignoreLoadView = true;
	return ({ type: LOAD_HISTORY_TRADES, book, ignoreLoadView })
};

const mapStateToProps = state => {
	const {backuptrades} = state.historyTradeReducer
	return {...state.tickersReducer, backuptrades} ;
}

const FilterMarketTickers = connect(
	mapStateToProps,
	{loadHistoryTrades}
)(MarketTable);

export default FilterMarketTickers;