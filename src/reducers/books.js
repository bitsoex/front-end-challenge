import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs'
import config from '../config'
import{
	LOAD_BOOKS,
	CHANGE_BOOK
} from './types'

export const booksEpic = action$ =>
	action$.ofType(LOAD_BOOKS)
	.flatMap(
		_ => Observable.ajax({
			url: config.endpoints.books,
			method: 'GET',
			crossDomain: true,
			responseType: 'json'
		})
		.catch(_=>{success:false})
	)
	.map(({response})=>{
		if(response.success)
			return response.payload;
		return [];
	})
	.map(data=>{
		return {
			type: CHANGE_BOOK,
			data: data,
			book: data[0].book
		}
	});

/**
 * Reducer for listen the request of the available Books.
 *
 * *Listen the actions:
 *  *CHANGE_BOOK Set in the state the books available
 */
export const booksReducer = (state = { loadingBooks: true, books: [], bookSelected: 'Loading' }, action) => {
	switch (action.type) {
		case CHANGE_BOOK:
			return {
				...state,
				loadingBooks: false,
				books: action.data ?  action.data : state.books,
				bookSelected: action.book
			};
		default:
			return state;
	}
};