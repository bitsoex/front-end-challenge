/**
 * The public REST API fail
 */

import React, { Component } from 'react';
import { grayzeros, percentAmount, numberFormat } from "../utils";

class Markets_list extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      ticker: [{"high":"146128.99","last":"145000.00","created_at":"2018-05-27T21:41:33+00:00","book":"btc_mxn","volume":"39.13500927","vwap":"144694.35391463","low":"144000.00","ask":"145971.35","bid":"145000.00"},{"high":"11692.99","last":"11261.00","created_at":"2018-05-27T21:41:33+00:00","book":"eth_mxn","volume":"145.67660649","vwap":"11224.40126739","low":"11001.01","ask":"11261.00","bid":"11100.00"},{"high":"0.00008309","last":"0.00008302","created_at":"2018-05-27T21:41:33+00:00","book":"xrp_btc","volume":"6264.14257710","vwap":"0.00008226","low":"0.00008116","ask":"0.00008297","bid":"0.00008123"},{"high":"12.12","last":"11.95","created_at":"2018-05-27T21:41:33+00:00","book":"xrp_mxn","volume":"229165.54392916","vwap":"11.92264681","low":"11.87","ask":"11.95","bid":"11.93"},{"high":"0.07912000","last":"0.07832000","created_at":"2018-05-27T21:41:33+00:00","book":"eth_btc","volume":"11.52389692","vwap":"0.07849967","low":"0.07660000","ask":"0.07824999","bid":"0.07681000"},{"high":"0.13410338","last":"0.13200240","created_at":"2018-05-27T21:41:33+00:00","book":"bch_btc","volume":"42.77995988","vwap":"0.13379984","low":"0.13118811","ask":"0.13399806","bid":"0.13200023"},{"high":"0.01639634","last":"0.01639235","created_at":"2018-05-27T21:41:33+00:00","book":"ltc_btc","volume":"13.69627605","vwap":"0.01608728","low":"0.01600001","ask":"0.01638918","bid":"0.01600001"},{"high":"2398.99","last":"2326.50","created_at":"2018-05-27T21:41:33+00:00","book":"ltc_mxn","volume":"338.42848480","vwap":"2354.32473303","low":"2325.01","ask":"2340.00","bid":"2330.00"},{"high":"19665.84","last":"19399.94","created_at":"2018-05-27T21:41:33+00:00","book":"bch_mxn","volume":"23.16429124","vwap":"19309.56665804","low":"19120.01","ask":"19399.94","bid":"19157.01"}]
	    };
	}

	componentDidMount() {
	    fetch("https://api.bitso.com/v3/ticker/")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            ticker: result.payload
	          });
	        }
	      )
	}

	render() {
		const { ticker } = this.state;
		return <div class="markets_list open">
			<div class="sidebar">
				<div class="title">
					<img src="/images/svg/icon_dropdown.svg" width="12"/>MERCADOS
				</div>
			</div>
			<div class="content">
				<div class="title_market">Mercados 24Hrs</div>
				<div class="marketsprices">
					<ul>
						{ticker.map(item => (
							<li>
								<div class="market">
									<div class="title">
										<div class="book">{item.book.split('_').join('/')}</div>
										<div class={item.last >= item.bid ? 'lastprice up':'lastprice down'}>${numberFormat(item.last)} MXN</div>
									</div>
								</div>
							</li>							
				       	))}
					</ul>
				</div>
			</div>
		</div>;
	}
}

export default Markets_list;