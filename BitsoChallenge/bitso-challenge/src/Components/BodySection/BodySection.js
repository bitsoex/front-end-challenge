import React, { Component } from 'react';
import LastTrades from './LastTradesSection/LastTrades'
// import './Header.css';

class BodySection extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          btc_to_mxn:0
        }
    
      }

  render() {
    return (
      <section className="body-section">
        <LastTrades/>

      </section>
    );
  }
}

export default BodySection;
