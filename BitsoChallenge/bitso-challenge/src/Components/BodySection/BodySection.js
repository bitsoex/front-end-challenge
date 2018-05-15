import React, { Component } from 'react';
import LastTrades from './LastTradesSection/LastTrades'
import './BodySection.css';

class BodySection extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          btc_to_mxn:0,
          activeCoin:this.props.activeCoin,
          array_trades:this.props.array_trades
        }
    
      }

      componentWillReceiveProps(nextProps){
        this.setState({activeCoin:nextProps.activeCoin, array_trades:nextProps.array_trades})
      }

  render() {
    return (
      <section className="body-section">
        <LastTrades array_trades={this.state.array_trades} activeCoin={this.state.activeCoin}/>

      </section>
    );
  }
}

export default BodySection;
