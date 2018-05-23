import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs'
import{
	LOAD_BOOKS,
	CHANGE_BOOK
} from './types'

export const booksEpic = action$ =>
  action$.ofType(LOAD_BOOKS)
	.map(_=>{
		console.log("Epic book, load Async books", _); 
		return _;
	})
	.flatMap(
		()=>Observable.ajax({
			url: 'https://api.bitso.com/v3/available_books/',
			//url: 'https://api.bitso.com/v3/available_books/',
			method: 'GET',
			crossDomain: true,
			responseType: 'json'
		})
		.catch(_=>{success:false})
	)
	.map(ajaxResponse=>{
		console.log("response booksEpic", ajaxResponse, action$);
		if(ajaxResponse.response.success)
			return ajaxResponse.response.payload;
		return [];
	})
	.map(data=>{return {type: CHANGE_BOOK, data: data, book: data[0].book}});

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