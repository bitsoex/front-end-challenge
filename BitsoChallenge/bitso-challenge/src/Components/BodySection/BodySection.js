import React, { Component } from 'react';
import LastTrades from './LastTradesSection/LastTrades'
import Posturas from './Posturas/Posturas'
import Markets from './Markets/Markets'
import './BodySection.css';

class BodySection extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          btc_to_mxn:0,
          activeCoin:this.props.activeCoin,
          array_trades:this.props.array_trades,
          array_post:this.props.array_post,
          activeTimeTrade:this.props.activeTimeTrade,
          orderBooks:this.props.orderBooks,
          ticketInfo:this.props.ticketInfo,
          arrayBooks:this.props.arrayBooks

        }
        this.changeRangeGraphic=this.changeRangeGraphic.bind(this)
      }

      componentWillReceiveProps(nextProps){
          
        this.setState({activeCoin:nextProps.activeCoin, array_trades:nextProps.array_trades,
          array_post:nextProps.array_post ,activeTimeTrade:nextProps.activeTimeTrade,orderBooks:nextProps.orderBooks,
          ticketInfo:nextProps.ticketInfo, arrayBooks:nextProps.arrayBooks})
      }


      changeRangeGraphic(range){
        this.props.changeRangeGraphic(range)
      }

  render() {
    return (
      <section className="body-section">
        <LastTrades array_trades={this.state.array_trades} activeCoin={this.state.activeCoin}/>
        <Posturas activeCoin={this.state.activeCoin} ticketInfo={this.state.ticketInfo} orderBooks={this.state.orderBooks} changeRangeGraphic={this.changeRangeGraphic} activeTimeTrade={this.state.activeTimeTrade}  array_post={this.state.array_post}/>
        <Markets arrayBooks={this.state.arrayBooks} />
      </section>
    );
  }
}

export default BodySection;
