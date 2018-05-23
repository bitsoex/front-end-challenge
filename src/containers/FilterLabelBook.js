import { connect } from 'react-redux'
import LabelBook from '../components/LabelBook'

const mapStateToProps = state => {
	console.log("state.MenuBooks", state);
	const {bookSelected} = state.booksReducer;
	const {message} = state.websocketReducer;
	return {bookSelected, message};
}

export default connect(
	mapStateToProps
)(LabelBook);

