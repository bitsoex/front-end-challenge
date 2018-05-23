import { Observable, Subject, ReplaySubject, from, of, range, zip, combineLatest } from 'rxjs'
import {
    CHANGE_BOOK,
    WS_DATA,
    LOADED_TRADES
} from './types';

const ajaxBook = (book) =>{
	//console.log("makin observable ajax trades="+book);
	return Observable.ajax({
		url: 'https://api.bitso.com/v3/trades/?limit=30&book='+book,
		//url: 'https://api.bitso.com/v3/trades/?limit=30&book='+book,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}

const ajaxTicker = (book) =>{
	//console.log("makin observable ajax ticker="+book);
	return Observable.ajax({
		url: 'https://api.bitso.com/v3/ticker/?book='+book,
		//url: 'https://api-dev.bitso.com/v3/ticker/?book='+book,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}

export const tradesEpic = action$ =>
  action$.ofType(CHANGE_BOOK)
	.map(action=>{
		//console.log("Epic Trades, load Async trades", action); 
		return action.book;
	})
	//.flatMap(bookSelected => ajaxTicker(bookSelected).catch(_=>{success:false}))
	.flatMap(bookSelected => 
		Observable.combineLatest(
			ajaxTicker(bookSelected),
			ajaxBook(bookSelected),
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
	//.zip(ajaxBook, ajaxTicker)
	/*.map(ajaxResponse=>{
		//console.log("response tradesEpic", ajaxResponse, action$);
		if(ajaxResponse.response.success)
			return ajaxResponse.response.payload;
		return [];
	})*/
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
					amount: action.monto
				});
			return{
				...state,
				trades: trades
			};
		default:
			return state;
	  }
};