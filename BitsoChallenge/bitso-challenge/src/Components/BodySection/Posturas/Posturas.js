import React, { Component } from 'react';
import { render } from 'react-dom';
import { timeParse } from "d3-time-format";
import { TypeChooser } from "react-stockcharts/lib/helper";
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
          ticketInfo:this.props.ticketInfo
        }
    
      }

      componentWillReceiveProps(nextProps){
        this.setState({array_post:nextProps.array_post,activeTimeTrade:nextProps.activeTimeTrade,
          orderBooks:nextProps.orderBooks,ticketInfo:nextProps.ticketInfo})
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
        <section className='select-graphic'></section>

        <section onMouseOver={this.showOptions.bind(this)} onMouseLeave={this.hideOptions.bind(this)} className="select-range">
          <p>{this.state.currentRange.name}</p>
          <section id='option-range-date' className='options-select hidden'>
          {ARRAY_TRADE_DATES.map(tradeDate => {
              return<p onClick={this.changeTradeDate.bind(this,tradeDate)}>{tradeDate.name}</p>;

            })}
          </section>
        </section>

        </section>
				 <Graphic type={'hybrid'} data={this.state.array_post} />
        <Lists ticketInfo={this.state.ticketInfo}  orderBooks={this.state.orderBooks} array_post={this.state.array_post}/>

      </section>
    );
  }
}

export default Posturas;
