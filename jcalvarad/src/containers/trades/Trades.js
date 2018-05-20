import React, { Component } from 'react';
import Trades from '../../components/trades/Trades'

const websocket = new WebSocket('wss://ws.bitso.com');

websocket.onopen = function () {
    websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
};

class TradesContainer extends Component {
    state = {
        trades:[]
    };
    render() {
        const generateTrade = wspayload => {
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    trades: [
                        ...prevState.trades,
                        {
                            time: (new Date()).getTime(),
                            rate: wspayload.r,
                            amount:wspayload.a
                        }
                    ]
                }
            })
        }

        websocket.onmessage = function (message) {
            var data = JSON.parse(message.data);

            if (data.type === 'trades' && data.payload) {
                generateTrade(data.payload[0]);
                console.log(data);
            } else {
                console.log("error", data);
            }
        };
        return (
            <div>
                <Trades trades={this.state.trades}/>
            </div>
        );
    }
}

export default TradesContainer;