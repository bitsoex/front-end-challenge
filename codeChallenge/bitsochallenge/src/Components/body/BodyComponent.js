import React, { Component } from 'react';
import LastTrades from './Trades/Trades'
// import './Header.css';

class BodyContent extends Component {
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

export default BodyContent;
