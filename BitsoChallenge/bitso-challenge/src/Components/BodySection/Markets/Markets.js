import React, { Component } from 'react';
import arrow from './../../../Assets/Images/SVG/icon_dropdown.svg';
import arrowGreen from './../../../Assets/Images/SVG/order_selector_green.svg';
import arrowRed from './../../../Assets/Images/SVG/order_selector_red.svg';
import callGetServices from './../../../Utils/CallServices';
import {URL_SERVICES} from './../../../Config';
import {BOOKS_AVAILABLES} from './../../../Config';
import './Markets.css';

class Markets extends Component {
    constructor(props) {
        super(props);
        
        this.state={
          arrayBooks:[],
          markets:"",
          btc_to_mxn:0,
          activeCoin:this.props.activeCoin,
          array_trades:this.props.array_trades,
          array_post:this.props.array_post,
          activeTimeTrade:this.props.activeTimeTrade,
          orderBooks:this.props.orderBooks,
          ticketInfo:this.props.ticketInfo

        }
        this.getBooks();
        this.interval = setInterval(() => {
            this.getBooks();
        }, 4000)


        // this.changeRangeGraphic=this.changeRangeGraphic.bind(this)
      }

      componentWillReceiveProps(nextProps){
          
        // this.setState({activeCoin:nextProps.activeCoin, array_trades:nextProps.array_trades,
        //   array_post:nextProps.array_post ,activeTimeTrade:nextProps.activeTimeTrade,orderBooks:nextProps.orderBooks,
        //   ticketInfo:nextProps.ticketInfo})
      }



      getBooks(){
            var arrayBooks=[];

            var arrayParams=[];
            var objParam={param:'', value:''}


            objParam.param='book';

            BOOKS_AVAILABLES.forEach(book => {
                objParam.value=book.book;
                arrayParams[0]=objParam;
                callGetServices(URL_SERVICES.Ticker,arrayParams).then(response => {
                    response.book=book;
                  arrayBooks.push(response);

                  this.setState({arrayBooks})
            });    
            }
        
        );

            
    }


      changeRangeGraphic(range){
        if(document.getElementById('markets-items').classList.contains('hidden')){
            document.getElementById('markets-items').classList.remove('hidden')
        }else{
            document.getElementById('markets-items').classList.add('hidden')
        }
      }

  render() {
    return (
      <section className="markets-section">
        <section className='bar-section' onClick={this.changeRangeGraphic.bind(this)}> <img src={arrow}/> <p>MERCADOS 24 HRS</p> </section>        
        <section id='markets-items' className="info-markets-section hidden">
        {this.state.arrayBooks.map(book => {
              return<section className='markets-list-row'> 

                <p className='columnBook'>{book.book.fromCoin}/{book.book.toCoin}</p>
                
                <section className={(book.payload.last<book.payload.vwap?'columnPriceDown':'columnPriceUp')}> <img src={(book.payload.last<book.payload.vwap?arrowRed:arrowGreen)}/><p > {book.payload.last} {book.book.toCoin}</p></section>
              
                </section>

            })}
        </section>
      </section>
    );
  }
}

export default Markets;
