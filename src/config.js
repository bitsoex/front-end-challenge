/**
* This file define the configuration of the aplicacion.
* 
* @cfg {number} timeIgnoreWebSocketsMessages - For best performance we can ignore some messages was emmited within time (300ms for example)
* because visually can be see by the user. Put 0 if you wanna RT.
* @cfg {number} initialLoadTrades - Determine how many trades is loaded when the application start 
  @cfg {number} dicimalNumberSizeString - Number of decimal to show for the numbers.
* @cfg {number} fractionDigits - The number of legend items to use to represent
* @cfg {Object} endpoints - Contains all the endpoints that the application use.
*/
const config = {
	timeIgnoreWebSocketsMessages: 300,
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