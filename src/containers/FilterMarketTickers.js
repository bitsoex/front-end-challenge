import { connect } from 'react-redux'
import MarketTable from '../components/MarketTable'

const LOAD_ALL_TICKERS = 'LOAD_ALL_TICKERS';

const loadTickers = () => {
	//console.log("connect.method.ping FilterTrades");
	return ({ type: LOAD_ALL_TICKERS })
};

const mapStateToProps = state => {
	//console.log("state.tickersReducer", state);
	return state.tickersReducer;
}

const FilterMarketTickers = connect(
	mapStateToProps,
	{loadTickers}
)(MarketTable);

export default FilterMarketTickers;