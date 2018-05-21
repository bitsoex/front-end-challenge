import React, { Component } from 'react';
import LastTrades from './Trades/Trades';
import Candlestick from './chart/Candlestick.js';
import {callGetService} from './../../Utils/CallServices.js';


import './BodyComponent.css';

class BodyContent extends Component {
    constructor(props) {
        super(props);

        this.state={
          btc_to_mxn:0
        }
        this.getBook();
      }
      defaultProps(){
        book:'btc_to_mxn';
        dataChart:'';
      }
      getBook(){
          var arrayParams=[];
          var objParam={param:'', value:''}
          objParam.param='book';
          objParam.value='btc_mxn';
          objParam.param='timeframe';
          objParam.value='1year';
          //arrayParams.push(objParam);
          console.log('PARAM: '+JSON.stringify(objParam));
          //callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
            callGetService('https://bitso.com/trade/chartJSON/btc_mxn/1year',arrayParams).then(response => {
            console.log('RESPONSEYEAR: '+JSON.stringify(response));
           this.setState({dataChart:response});
          // {
          // this.setState({book	:this.state.respBtc.payload.book,
          //                volume:this.state.respBtc.payload.volume,
          //                high:this.state.respBtc.payload.high,
          //                last:this.state.respBtc.payload.last,
          //                low:this.state.respBtc.payload.low,
          //                vwap:this.state.respBtc.payload.vwap,
          //                ask:this.state.respBtc.payload.ask,
          //                bid:this.state.respBtc.payload.bid,
          //                created_at	:this.state.respBtc.payload.created_at  });
          // }

          }
        );
      }
  render() {
    return (
      <div className="lasTrades">
        <nav className="lasTrades">
          <LastTrades />
        </nav>
        <section className="chartContent">
          <header className="backgroundBody inlineDisplay">
            HEADER
          </header>
          <article>
            <Candlestick data={this.state.dataChart}/>
          </article>
          <article>
            <Candlestick />
          </article>
        </section>
      </div>
    );
  }
}

export default BodyContent;
