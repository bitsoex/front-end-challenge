import { Observable, Subject, ReplaySubject, from, of, range, zip, combineLatest } from 'rxjs'
import {
	LOAD_HISTORY_TRADES,
	LOADED_HISTORY_TRADES
} from './types';

const DEFAULT_PERIOD = "1month";

const ajaxBook = (book, period = DEFAULT_PERIOD) =>{
	//console.log("makin observable ajax trades="+book);
	return Observable.ajax({
		url: "https://bitso.com/trade/chartJSON/"+ book +"/"+period,
		//url: 'https://api.bitso.com/v3/trades/?limit=30&book='+book,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}
export const historyTradeEpic = action$ =>
  action$.ofType(LOAD_HISTORY_TRADES)
	//.flatMap(bookSelected => ajaxTicker(bookSelected).catch(_=>{success:false}))
	.flatMap(({book, period}) => 
		Observable.combineLatest(
			ajaxBook(book, period),
			(responseTrades) => {
				return responseTrades.response;
			}
		)
	)
	.map(results=>{
		const parseToFloat = ["low", "high", "close", "open"];
		const parseToDate = ["date"];
		results.map(item =>{
			parseToFloat.map(key=>{
				item[key]=parseFloat(item[key]);
				item.date = new Date(item.date);
				return key;
			});
			return item;
		});
		return results;
	})
	.map(results=>{return {type: LOADED_HISTORY_TRADES, trades: results}});

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