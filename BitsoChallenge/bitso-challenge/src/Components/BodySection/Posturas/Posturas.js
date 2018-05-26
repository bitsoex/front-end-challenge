import React, { Component } from 'react';
import{ARRAY_TRADE_DATES} from './../../../Config'
import Lists from './Lists/Lists';
import Graphic from './Graphic/Graphic';
import './Posturas.css';

class Posturas extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          array_post:this.props.array_post,
          activeTimeTrade:this.props.activeTimeTrade,
          currentRange:this.props.activeTimeTrade,
          orderBooks:this.props.orderBooks,
          ticketInfo:this.props.ticketInfo,
          activeCoin:this.props.activeCoin
        }
        this.ticks=[{x: 0, y_sell: 0.5, y_buy: undefined}, {x: 1, y_sell: undefined, y_buy: 0.5}];
    
      }

      componentWillReceiveProps(nextProps){
        this.setState({array_post:nextProps.array_post,activeTimeTrade:nextProps.activeTimeTrade,
          orderBooks:nextProps.orderBooks,ticketInfo:nextProps.ticketInfo,activeCoin:nextProps.activeCoin})
      }

      showOptions(){
        document.getElementById('option-range-date').classList.remove('hidden');
        }
    
        hideOptions(){
            document.getElementById('option-range-date').classList.add('hidden');
            }
    
            changeTradeDate(tradeDate){
              console.log('se manda el rango ' + JSON.stringify(tradeDate))
            this.props.changeRangeGraphic(tradeDate);
            this.setState({currentRange:tradeDate})
        }

  render() {
    return (
      <section className="body-section-posturas">
        <section className="change-items">
        <section className='select-graphic'><p className='text'>Periodo</p> </section>

        <section onMouseOver={this.showOptions.bind(this)} onMouseLeave={this.hideOptions.bind(this)} className="select-range">
          <section className='perdiod-selector'> <p className='selector'>{this.state.currentRange.name}</p></section>
          <section id='option-range-date' className='options-select hidden'>
          {ARRAY_TRADE_DATES.map(tradeDate => {
              return<p onClick={this.changeTradeDate.bind(this,tradeDate)}>{tradeDate.name}</p>;

            })}
          </section>
        </section>

        </section>
				 <Graphic type={'hybrid'} data={this.state.array_post} />
         {/* <DeephGraphic type={'hybrid'} ticks={this.ticks} width={300} /> */}
        <Lists activeCoin={this.state.activeCoin} ticketInfo={this.state.ticketInfo}  orderBooks={this.state.orderBooks} array_post={this.state.array_post}/>

      </section>
    );
  }
}

export default Posturas;
