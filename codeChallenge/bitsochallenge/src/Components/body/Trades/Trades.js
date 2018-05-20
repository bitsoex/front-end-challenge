import React, { Component } from 'react';
import {URL_SERVICES} from './../../../config/Config.js';
import {SERVICE_REQUEST} from './../../../config/Config.js';
import {callGetService} from './../../../Utils/CallServices.js';
import TableTrades from './../tradesTable/tradesTable.js'
import './Trades.css';

class Trades extends Component {
    constructor(props) {
        super(props);

        this.state={
          array_trades:[],
          mxn:'MXN',
          coinSelected:'BTC',
          arrayData:[]
        }
        this.getTrades();

      }
      componentDidMount(){
        this.delaySetter();
        //
      }

      componentDidUpdate(){
        this.delaySetter();
      }

      delaySetter(){
        setTimeout(function() { this.getTrades()}.bind(this),5000);
      }
      getTrades(){
        var arrayParams=[];
        var objParam={param:'', value:''}
        objParam.param='book';
        objParam.value=SERVICE_REQUEST.book_btc_mx;
        arrayParams.push(objParam)
        callGetService(URL_SERVICES.Trades,arrayParams).then(response => {
        this.setState({array_trades:response.payload})
        }
      );
      }


  render() {
    return (
      <section className="trades-section">
        <section className='trades-header'>
            <p className='trades-header-tittle'>Ultimos Trades</p>
            <section className='trades-header-column'>
            <p className='column'>Hora</p>
            <p className='column'><span className='coin'>{this.state.mxn}</span> precio</p>
            <p className='column'><span className='coin'>{this.state.coinSelected}</span> Monto</p>
            </section>
        </section>
        <section className='trades-list-result'>
        <TableTrades tableData={this.state.array_trades}/>
        </section>
      </section>
    );
  }
}

export default Trades;
