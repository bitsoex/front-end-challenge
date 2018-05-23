import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './Lists.css';

class Lists extends Component {
    constructor(props) {
        super(props);
        console.log('Recibo tiketinfo ' + JSON.stringify(this.props.ticketInfo))
        this.state={
          array_post:this.props.array_post,
          orderBooks:this.props.orderBooks,
          ticketInfo:this.props.ticketInfo
        }
    
      }

      componentWillReceiveProps(nextProps){
        this.setState({array_post:nextProps.array_post,orderBooks:nextProps.orderBooks,ticketInfo:nextProps.ticketInfo})
      }

  render() {
    return (
      <section className="list-section">
      
      <section className='bid-section'>
      <section className='bid-header'><span>Posturas de compra</span> <span>{this.state.ticketInfo.payload.bid}</span></section>
      <section className='rows-section'>
      <Scrollbars style={{ height: 200 }}>
      {this.state.orderBooks.payload.bids.map(bids => {
              return<section className='bid-list-row'> 
               <p className='column' ><div style={{width:((bids.amount/this.state.orderBooks.payload.totSumBid)*100)+'%'}}></div></p>
                <p className='column'>{bids.sum}</p>
                <p className='column'>{bids.amount}</p>
                <p className='column'>{bids.valor}</p>
                <p className='columnPrice'>{bids.price}</p>
                  </section>

            })}
            </Scrollbars>
      </section>
      </section>

      <section className='asks-section'>
      <section className='asks-header'><span>Posturas de compra</span> <span>{this.state.ticketInfo.payload.ask}</span></section>
      <section className='rows-section'>
      <Scrollbars style={{ height: 200 }}>
      {this.state.orderBooks.payload.asks.map(asks => {
              return<section className='asks-list-row'> 
               <p className='columnPrice'>{asks.price}</p>
                <p className='column'>{asks.valor}</p>
                <p className='column'>{asks.amount}</p>
                <p className='column'>{asks.sum}</p>
                <p className='column'><div style={{width:((asks.amount/this.state.orderBooks.payload.totSumAsk)*100)+'%'}}></div></p>
                  </section>

            })}
            </Scrollbars>
      </section>
      </section>
      
      </section>
    );
  }
}

export default Lists;
