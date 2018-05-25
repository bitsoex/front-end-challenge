import { connect } from 'react-redux'
import LabelBook from '../components/LabelBook'

const mapStateToProps = state => {
	//console.log("state.MenuBooks", state);
	const {bookSelected} = state.booksReducer;
	const {exchange} = state.websocketReducer;
	return {bookSelected, exchange};
}

export default connect(
	mapStateToProps
)(LabelBook);

