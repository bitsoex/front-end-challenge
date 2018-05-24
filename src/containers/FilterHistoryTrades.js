import { connect } from 'react-redux'
import ChartTrade from '../components/ChartTrade'

const LOAD_HISTORY_TRADES = 'LOAD_HISTORY_TRADES';


const mapDispatchToProps = dispatch => {
	//console.log("connect.method.ping FilterBooks", dispatch);
	return {
		changePeriodInterval : (book, period, interval) => dispatch({
			type : LOAD_HISTORY_TRADES,
			book: book,
			period: period,
			interval: interval
		})
	}
}

const mapStateToProps = state => {
	const {bookSelected} = state.booksReducer;
	const {historytrades} = state.historyTradeReducer;
	return {bookSelected, historytrades};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChartTrade);