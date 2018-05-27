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
	.switchMap(({book, period, ignoreLoadView}) => ajaxBook(book, period ? period : DEFAULT_PERIOD)
		.map(response=>{
			console.log("New load History Trade!!!!", book);
			return {
				response: response.response,
				book: book,
				period: period ? period : DEFAULT_PERIOD,
				ignoreLoadView: ignoreLoadView
			};
		})
	)
	.map(({response, book, period, ignoreLoadView}) => {
		const results = response;
		const parseToFloat = ["low", "high", "close", "open", "vwap", "volume"];
		results.map(item =>{
			item.date = new Date(item.date);
			parseToFloat.map(key=>{
				item[key]=parseFloat(item[key]);
				return key;
			});
			return item;
		});
		//console.log("loaded history trades", results);
		return {
			type: LOADED_HISTORY_TRADES,
			trades: results,
			book: book,
			period: period,
			ignoreLoadView: ignoreLoadView
		};
	});


/**
 * Reducer for listen the history of the trades.
 *
 * *Listen the actions:
 *  *LOADED_ALL_TICKERS Set in the state the history trades of the selected book.
 */
export const historyTradeReducer = (state = {historytrades:[], backuptrades: {}, selectedPeriod: DEFAULT_PERIOD}, action) => {
	  switch (action.type) {
		case LOADED_HISTORY_TRADES:
			let newHistory = null;
			if(action.period == DEFAULT_PERIOD){
				newHistory = {};
				newHistory[action.book] = action.trades;
			}
			
			return { 
				...state,
				selectedPeriod: action.ignoreLoadView ? state.selectedPeriod : action.period,
				historytrades: action.ignoreLoadView ? state.historytrades : action.trades,
				backuptrades: {...state.backuptrades, ...newHistory}//newHistory ? newHistory : state.backuptrades
			};
		default:
			return state;
	  }
};