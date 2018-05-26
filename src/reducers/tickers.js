import { Observable, Subject, ReplaySubject, from, of, range, zip, combineLatest } from 'rxjs'
import config from '../config'
import {
    CHANGE_BOOK,
    LOAD_ALL_TICKERS,
    LOADED_ALL_TICKERS,
    WS_DATA
} from './types';

const ajaxTickers = (book) =>{
	return Observable.ajax({
		url: config.endpoints.ticker,
		method: 'GET',
		crossDomain: true,
		responseType: 'json'
	})
}

export const tickersEpic = action$ =>
  action$.ofType(CHANGE_BOOK)
	.map(action=>{
		return action.book;
	})
	.take(1)
	.switchMap(bookSelected => 
			ajaxTickers(bookSelected)
			.map(responseTickers => responseTickers.response.payload)
	).map(results=>{
		const parseToNumber = ["ask", "bid", "high", "last", "low", "volume", "vwap"];
		results.map(ticker=>{
			parseToNumber.map(key=>ticker[key] = parseFloat(ticker[key]))
			return ticker;
		});
		return results;
	})
	.map(results=>results.sort((tickerA, tickerB)=>{
			if(tickerA.book.split('_')[1] < tickerB.book.split('_')[1]) return 1;
			if(tickerA.book.split('_')[1] > tickerB.book.split('_')[1]) return -1;
				return 0;
		})
	)
	.map(results=>{
		return {
			type: LOADED_ALL_TICKERS,
			tickers: results
		}
	});

/**
 * Reducer for listen the tickers request.
 *
 * *Listen the actions:
 *  *LOADED_ALL_TICKERS Set in the state the tickes
 */
export const tickersReducer = (state = {  tickers:[] }, action) => {
	  switch (action.type) {
		case LOADED_ALL_TICKERS:
			return { 
				...state,
				tickers: action.tickers
			};
		default:
			return state;
	  }
};