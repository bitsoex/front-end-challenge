import { Observable, Subject, ReplaySubject, from, of, range, zip, combineLatest } from 'rxjs'
import config from '../config'
import {
	CHANGE_BOOK,
	LOAD_HISTORY_TRADES,
	LOADED_HISTORY_TRADES
} from './types';

const DEFAULT_PERIOD = "1month";

const ajaxBook = (book, period = DEFAULT_PERIOD) =>{
	return Observable.ajax({
		url: config.endpoints.trade + book + "/" + period,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}
export const historyTradeEpic = action$ =>
  //action$.ofType(LOAD_HISTORY_TRADES)
  action$.filter(action => action.type === LOAD_HISTORY_TRADES || action.type === CHANGE_BOOK)
	.switchMap(({book, period}) => ajaxBook(book, period ? period : DEFAULT_PERIOD))
	.map(response => {
		const results = response.response;
		const parseToFloat = ["low", "high", "close", "open"];
		results.map(item =>{
			item.date = new Date(item.date);
			parseToFloat.map(key=>{
				item[key]=parseFloat(item[key]);
				return key;
			});
			return item;
		});
		console.log("loaded history trades", results);
		return results;
	})
	.map(results=>{return {type: LOADED_HISTORY_TRADES, trades: results}});


/**
 * Reducer for listen the history of the trades.
 *
 * *Listen the actions:
 *  *LOADED_ALL_TICKERS Set in the state the history trades of the selected book.
 */
export const historyTradeReducer = (state = {historytrades:[]}, action) => {
	  switch (action.type) {
		case LOADED_HISTORY_TRADES:
			return { 
				...state,
				historytrades: action.trades
			};
		default:
			return state;
	  }
};