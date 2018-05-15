import React, { Component } from 'react';
import {BOOKS_AVAILABLES} from './../../../Config'
import './SelectCoin.css';

class SelectCoin extends Component {
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


    showOptions(){
    document.getElementById('option-coins').classList.remove('hidden');
    }

    hideOptions(){
        document.getElementById('option-coins').classList.add('hidden');
        }

    changeBook(book){
        this.props.changeBook(book);
    }

  render() {

    return (
      <section className="selectCoin-section">
        <section onMouseOver={this.showOptions.bind(this)} onMouseLeave={this.hideOptions.bind(this)} className="selectCoinOption">
          <p>{this.state.activeCoin.fromCoin}/{this.state.activeCoin.toCoin}</p>
          <section id='option-coins' className='options-select hidden'>
          {BOOKS_AVAILABLES.map(book => {
              return<p onClick={this.changeBook.bind(this,book)}> {book.fromCoin}/{book.toCoin}</p>;

            })}
          </section>
        </section>

         <section className="info-section">

          <p><span>Volumen 24 hrs.</span> {this.state.ticketInfo.payload.volume}</p>
           <p><span>Max.</span>{this.state.ticketInfo.payload.high}</p>
           <p><span>Min.</span>{this.state.ticketInfo.payload.low}</p>
           <p><span>Variacion.</span> </p>
        </section>
        
      </section>
    );

  }

}

export default SelectCoin;
