import React, { Component } from 'react';
import LastTrades from './Trades/Trades'
 import './BodyComponent.css';

class BodyContent extends Component {
    constructor(props) {
        super(props);

        this.state={
          btc_to_mxn:0
        }

      }

  render() {
    return (
      <div className="navContent">
        <LastTrades />
      </div>
    );
  }
}

export default BodyContent;
