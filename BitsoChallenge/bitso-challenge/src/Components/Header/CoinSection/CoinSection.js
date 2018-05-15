import React, { Component } from 'react';

import './CoinSection.css';

class CoinSection extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      changeAmount:0,
      activeCoin:this.props.activeCoin,
      ticketInfo:this.props.ticketInfo
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps!==this.props){
        this.setState({ticketInfo:nextProps.ticketInfo, activeCoin:nextProps.activeCoin})
    }
}


  render() {
    if(this.state.ticketInfo!==null){
    return (
      <section className="coin-section">
        <section className="view-exchange">
          <p>1 {this.state.activeCoin.fromCoin} = {this.state.ticketInfo.payload.last} {this.state.activeCoin.toCoin}</p>
          
        </section>
        
      </section>
    );
  }else{
    return (
    <section className="coin-section">
      </section>
    );
  }
  }

}

export default CoinSection;
