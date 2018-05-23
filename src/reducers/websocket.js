import { Observable, Subject, ReplaySubject, from, of, range, webSocket } from 'rxjs'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'
import {
    LOAD_BOOKS,
    CHANGE_BOOK,
    WS_DATA,
    WS_DATA_ORDERS,
    LOADED_TRADES
} from './types';

//const socket = WebSocketSubject.create('wss://ws.bitso.com');
const socket = Observable.webSocket('wss://ws.bitso.com')
//socket.next(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'diff-orders' }));
//socket.next(JSON.stringify({"type":"subscribe-channels","data":{"channels":["stats","btc_mxn"]}}));

const bufferDataBids = {};
const bufferDataAsks = {};

export const websocketEpic = action$ =>
  action$.ofType(CHANGE_BOOK)
	.map(action=>{
		console.log("Epic websocket, connecting websocket", action$, action); 
		return action;
	})
	.map(action => {
		const {book, lastBook} = action;
		socket.next(JSON.stringify({ action: 'subscribe', book: book, type: 'trades' }));
		socket.next(JSON.stringify({ action: 'subscribe', book: book, type: 'orders' }));
		if(lastBook){
			console.log("desubscribe book", lastBook);
			socket.next(JSON.stringify({ action: 'unsubscribe', book: lastBook, type: 'trades' }));
			socket.next(JSON.stringify({ action: 'unsubscribe', book: lastBook, type: 'orders' }));
		}
		return book;
	})
	.flatMap(bookSelected => socket)
	.filter(wsResponse=>wsResponse.payload)
	.map(wsResponseData=>{
		 if (wsResponseData.type == 'orders') {
			console.log("bids:", wsResponseData.payload);
			var sumBids = 0, sumAsks = 0;
			const bidsData = wsResponseData.payload.bids.slice(0);
			const asksData = wsResponseData.payload.asks.slice(0);
			
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
				book: 'btc_mxn'
			}
		}
		return {
			type: WS_DATA,
			data: wsResponseData.payload[0].r,
			monto: wsResponseData.payload[0].a,
			book: 'btc_mxn'
		}
		
	})
	//.map(wsResponse=>[wsResponse.payload[0].r, wsResponse.payload[0].a, 'btc_mxn'])
	.map(wsResponse=>{
		console.log("response websocketEpic", wsResponse);
		return wsResponse;
	});

export const websocketReducer = (state = { message:"", monto: "", bids:[], asks:[] }, action) => {
	console.log("booksReducer", state, action);
	switch (action.type) {
		case LOADED_TRADES:
			return { 
				...state,
				message: action.books[0] ? action.books[0].price : state.message,
				monto: action.monto
			};
		case WS_DATA:
			return {
				...state,
				message: action.data ? action.data: state.message,
				monto: action.monto ? action.monto: state.monto
			};
		case WS_DATA_ORDERS:{
			return {
				...state,
				bids: action.bids,
				asks: action.asks,
			}
		}
		default:
			//console.log("bookReducer default state", state);
			return state;
	}
};