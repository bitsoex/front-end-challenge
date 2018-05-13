import React, { Component } from 'react';
import {URL_SERVICES} from './../../../Config';
import {PARAMS_SERVICES} from './../../../Config';
import {callGetServices} from './../../../Utils/CallServices';
import './LastTrades.css';

class LastTrades extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          array_trades:[],
          mxn:'MXN',
          coinSelected:'BTC'
        }

        this.getTrades();

      }



      getTrades(){
        var arrayParams=[];
        var objParam={param:'', value:''}
    
        objParam.param='book';
        objParam.value=PARAMS_SERVICES.book_btc_mx;
        arrayParams.push(objParam)
    
        callGetServices(URL_SERVICES.Trades,arrayParams).then(response => {
                
          
          console.log(response)
          this.setState({array_trades:response.payload})

          // this.setState({array_trades:[{created_at:'20:04',price:10000, amount:2000,maker_side:'buy'},{created_at:'20:04',price:10000, amount:2000,maker_side:'sell'},{created_at:'20:04',price:10000, amount:2000,maker_side:'buy'}]})
          // this.setState({btc_to_mxn:response.payload.last})
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
            {this.state.array_trades.map(trade => {
              return<section className='trades-list-row'> 
                <p className='column'>{trade.created_at.substring(11,19)}</p>
                <p className={trade.maker_side==='buy'?'tradeBuy':'tradeSell'}>{trade.price}</p>
                <p className='column'>{trade.amount}</p>
                  </section>

            })}
            </section>
      </section>
    );
  }
}

export default LastTrades;
