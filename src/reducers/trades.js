import { Observable, Subject, ReplaySubject, from, of, range, zip, combineLatest } from 'rxjs'
import config from '../config'
import {
    CHANGE_BOOK,
    WS_DATA,
    LOADED_TRADES
} from './types';

const ajaxBook = (book) =>{
	return Observable.ajax({
		url: config.endpoints.trades + "?limit=" + config.initialLoadTrades + "&book=" + book,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}

const ajaxTicker = (book) =>{
	return Observable.ajax({
		url: config.endpoints.ticker + '?book=' + book,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}

export const tradesEpic = action$ =>
  action$.ofType(CHANGE_BOOK)
	.flatMap(({book}) => 
		Observable.combineLatest(
			ajaxTicker(book),
			ajaxBook(book),
			(responseTicker, responseBooks) => {
				const results = {
					books: [],
					ticker: {}
				};
				if(responseTicker.response.success)
					results.ticker = responseTicker.response.payload;
				if(responseBooks.response.success)
					results.books = responseBooks.response.payload;
				return results;
			}
		)
	).map(results=>{
		var keys = Object.keys(results.ticker)
		const parseToNumber = ["ask", "bid", "high", "last", "low", "volume", "vwap"].filter(ptn=> keys.includes(ptn));
		parseToNumber.map(key => results.ticker[key] = parseFloat(results.ticker[key]))
		return results;
	})
	.map(results=>{return {type: LOADED_TRADES, books: results.books, ticker: results.ticker}});

export const tradesReducer = (state = { loadingTrades: true, trades:[], ticker:{} }, action) => {
	  switch (action.type) {
		case LOADED_TRADES:
			return { 
				...state,
				loadingTrades: false, 
				trades: action.books,
				ticker: action.ticker
			};
		case WS_DATA:
			var trades = state.trades.slice(0);
			trades.unshift({
					price: action.data,
					created_at: new Date(),
					book: action.book,
					amount: action.amount
				});
			return{
				...state,
				trades: trades
			};
		default:
			return state;
	  }
};