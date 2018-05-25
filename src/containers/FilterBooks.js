import { connect } from 'react-redux'
import Header2 from '../components/Header2'

const CHANGE_BOOK = 'CHANGE_BOOK';

const mapDispatchToProps = dispatch => {
	return {
		selectBook : (book, lastBook) => dispatch({
			type : CHANGE_BOOK,
			book: book,
			lastBook: lastBook
		})
	}
}

const mapStateToProps = state => {
	const {bookSelected, books} = state.booksReducer;
	const {ticker} = state.tradesReducer;
	const {exchange} = state.websocketReducer;
	return {bookSelected, books, ticker, exchange};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header2);