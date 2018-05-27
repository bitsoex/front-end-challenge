import { Observable, webSocket } from 'rxjs'
import config from '../config'
import {
    LOAD_BOOKS,
    CHANGE_BOOK,
    WS_DATA,
    WS_DATA_ORDERS,
    LOADED_TRADES
} from './types';


const socketWS = Observable.webSocket(config.endpoints.websocket)
const bufferDataBids = {};
const bufferDataAsks = {};
let subscribedToWebsocket = false;

/**
 * Epic for connect to websocket of Bitso.
 *
 * Flow of the Epic:
 *
 * After fire action(CHANGE_BOOK) the observer disconnect the previous subscription in the websocket
 * then subscribe to the new book, listen the trades and orders.
 * Then filter the response contains the payload with the book previosly selected.
 * Finally response a new action depend of the response.
 */



export const websocketEpic = action$ =>
  action$.ofType(CHANGE_BOOK)
	.map(({book, lastBook}) => {
		console.log("NEW CHANGE_BOOK", book, lastBook, arguments);
		if(lastBook){
			socketWS.next(JSON.stringify({ action: 'unsubscribe', book: lastBook, type: 'trades' }));
			socketWS.next(JSON.stringify({ action: 'unsubscribe', book: lastBook, type: 'orders' }));
		}
		socketWS.next(JSON.stringify({ action: 'subscribe', book: book, type: 'trades' }));
		socketWS.next(JSON.stringify({ action: 'subscribe', book: book, type: 'orders' }));
		return book;
	})
	.filter(_=>!subscribedToWebsocket)
	.map(_=>{
		subscribedToWebsocket = true;
		return _;
	})
	.switchMap( bookSelected => socketWS.filter(response => response.payload && response.book == bookSelected)
		/*Observable.interval(config.timeIgnoreWebSocketsMessages)
		.withLatestFrom(socketWS.filter(response => response.payload && response.book == bookSelected))
		.map(([timer, websocketResponse]) => {
			return websocketResponse;
		})*/
	)
	.map(a => {
		const {payload, book, type} = a;
		//console.log("response transform0>", payload, book, type, a);
		 if (type == 'orders') {
			var sumBids = 0, sumAsks = 0;
			const bidsData = payload.bids.slice(0);
			const asksData = payload.asks.slice(0);
			
			bidsData.map(data=>{
				sumBids += data.a;
				data.sum = sumBids;
				data.active = !!bufferDataBids[data.o];
				bufferDataBids[data.o] = true;
				return data;
			});
			asksData.map(data=>{
				sumAsks += data.a;
				data.sum = sumAsks;
				data.active = !!bufferDataAsks[data.o];
				bufferDataAsks[data.o] = true;
				return data;
			});
			return {
				type: WS_DATA_ORDERS,
				bids: bidsData,
				asks: asksData,
				book: book
			}
		}
		return {
			type: WS_DATA,
			data: payload[0].r,
			amount: payload[0].a,
			book: book
		}
		
	})
	.map(wsResponse=>{
		return wsResponse;
	});

/**
 * Reducer for connect to websocket of Bitso.
 *
 * *Listen the actions:
 *  *LOADED_TRADES Set in the state the price and the amount of the current book selected
 *  *WS_DATA Set in the state the last trades emmited.
 */
export const websocketReducer = (state = { exchange:"0", amount: "", bids:[], asks:[] }, action) => {
	switch (action.type) {
		case LOADED_TRADES:
			return { 
				...state,
				exchange: action.books[0] ? action.books[0].price : state.exchange,
				amount: action.amount
			};
		case WS_DATA:
			return {
				...state,
				exchange: action.data ? action.data: state.exchange,
				amount: action.amount ? action.amount: state.amount
			};
		case WS_DATA_ORDERS:{
			return {
				...state,
				bids: action.bids,
				asks: action.asks,
			}
		}
		default:
			return state;
	}
};