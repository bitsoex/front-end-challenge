import React, { Component } from 'react';
import './LastTrades.css';
import { Scrollbars } from 'react-custom-scrollbars';
class LastTrades extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          mxn:'MXN',
          coinSelected:'BTC',
          activeCoin:this.props.activeCoin,
          array_trades:this.props.array_trades
        }

      }

      componentWillReceiveProps(nextProps){
        this.setState({activeCoin:nextProps.activeCoin, array_trades:nextProps.array_trades})
      }

    

  render() {
    return (
      <section className="trades-section">
        <section className='trades-header'> 
            <p className='trades-header-tittle'>ÚLTIMOS TRADES</p>
            <section className='trades-header-column'>
                <p className='column'>Hora</p>
                <p className='column'><span className='coin'>{this.state.activeCoin.toCoin}</span> precio</p>
                <p className='column'><span className='coin'>{this.state.activeCoin.fromCoin}</span> Monto</p>
            </section>

           
 
        </section>
        
        <section className='trades-list-result'>
        <Scrollbars style={{ width: 290 }}>
            {this.state.array_trades.payload.map(trade => {
              return<section className='trades-list-row'> 
                <p className='column'>{trade.created_at.substring(11,19)}</p>
                <p className={trade.maker_side==='buy'?'tradeBuy':'tradeSell'}>{trade.price}</p>
                <p className='column'>{trade.amount}</p>
                  </section>

            })}
            </Scrollbars>
            </section>
      </section>
    );
  }
}

export default LastTrades;
