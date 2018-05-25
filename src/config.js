/**
* This file define the configuration of the aplicacion.
* 
* @cfg {Number} initialLoadTrades Determine how many trades is loaded when the application start 
* @cfg {Number} fractionDigits The number of legend items to use to represent
* @cfg {Object} Contains all the endpoints that the application use.
*/
const config = {
	initialLoadTrades:30,
	dicimalNumberSizeString: 8,
	fractionDigits: 2,
	endpoints:{
		websocket: "wss://ws.bitso.com",
		books: "https://api.bitso.com/v3/available_books/",
		trade: "https://bitso.com/trade/chartJSON/",
		ticker: "https://api.bitso.com/v3/ticker/",
		trades: "https://api.bitso.com/v3/trades/"
	}
}

export default config