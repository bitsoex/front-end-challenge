import { connect } from 'react-redux'
import MenuBooks from '../components/MenuBooks'

const CHANGE_BOOK = 'CHANGE_BOOK';


const mapDispatchToProps = dispatch => {
	//console.log("connect.method.ping FilterBooks", dispatch);
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
	//console.log("state.MenuBooks", state, bookSelected, books, ticker);
	return {bookSelected, books, ticker};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuBooks);