import React, { Component } from 'react';
import _ from 'lodash';

import TableOrderBookBids from './TableOrderBookBids';
import TableOrderBookAsks from './TableOrderBookAsks';

class Order_book extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      orderbook: {bids:[{
            "book": "",
            "price": "0",
            "amount": "0"
        }], asks:[{
            "book": "",
            "price": "0",
            "amount": "0"
        }]}
	    };
	}

	componentDidMount() {
	    fetch("https://api.bitso.com/v3/order_book/?book=btc_mxn")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            orderbook: result.payload
	          });
	        }
	      )
	}

	render() {
		return <div class="orderbook">
			<div class="buyorders">
				<div class="header">
					<div class="title">Posturas de compra</div>
					<div class="bidmax"><span class="dark_text">MXN</span> Bid {_.head(this.state.orderbook.bids).price}</div>
				</div>
				<TableOrderBookBids orderbook={_.slice(this.state.orderbook.bids,0,10)}/>
			</div>
			<div class="sellorders">
				<div class="header">
					<div class="askmin">{_.head(this.state.orderbook.asks).price} Ask <span class="dark_text">MXN</span></div>
					<div class="title">Posturas de venta</div>
				</div>
				<TableOrderBookAsks orderbook={_.slice(this.state.orderbook.asks,0,10)}/>
			</div>
		</div>;
	}
}

export default Order_book;