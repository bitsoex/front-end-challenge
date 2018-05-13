import React, { Component } from 'react';
// import './Header.css';

class LastTrades extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          btc_to_mxn:0
        }

      }

  render() {
    return (
      <section className="trades-section">
        <section className='trades-header'> 
            <p>Ultimos Trades</p>
            <section className='trades-header-column'>
                <p>Hora</p>
                <p>Mxn precio</p>
                <p>BTC Monto</p>
            </section>
        <section className='list-trades'>
            <p></p>
        </section>
        </section>
        

      </section>
    );
  }
}

export default LastTrades;
