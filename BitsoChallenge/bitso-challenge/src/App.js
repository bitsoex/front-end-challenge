import React, { Component } from 'react';
import Spinner from 'react-loader-spinner';
import './App.css';
import Header from './Components/Header/Header';
import BodySection from './Components/BodySection/BodySection';
import {BOOKS_AVAILABLES} from './Config'
import {URL_SERVICES} from './Config.js';
import {PARAMS_SERVICES} from './Config.js';
import {ARRAY_TRADE_DATES} from './Config.js';
import {getData} from './Utils/CallServices.js';
import {callGetServices} from './Utils/CallServices.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      activeCoin:BOOKS_AVAILABLES[0],
      activeTimeTrade:ARRAY_TRADE_DATES[0],
      ticketInfo:null,
      array_trades:null,
      array_post:null,
      orderBooks:null
    }
    this.getBtcCost();
    this.getTrades();
    this.getGraphic();
    this.getOrderBook();
    this.changeBook=this.changeBook.bind(this);
    this.changeRangeGraphic=this.changeRangeGraphic.bind(this)
  }

  changeBook(book){
    
    this.state.activeCoin=book;
    this.getBtcCost();
    this.getTrades();
    this.getGraphic();

  }

  changeRangeGraphic(range){
    this.state.activeTimeTrade=range;
    this.getGraphic();
  }


  getOrderBook(){
    var arrayParams=[];
    var objParam={param:'', value:''}
    objParam.param='book';
    objParam.value=this.state.activeCoin.book;
    arrayParams.push(objParam);
    callGetServices(URL_SERVICES.OrderBook,arrayParams).then(response => {
      this.setState({orderBooks:response});
    }
  
  );
  }

  getBtcCost(){
    var arrayParams=[];
    var objParam={param:'', value:''}
    objParam.param='book';
    objParam.value=this.state.activeCoin.book;
    arrayParams.push(objParam);
    callGetServices(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({ticketInfo:response});
    }
  
  );
  }

  getGraphic(){
    getData(this.state.activeCoin.book,this.state.activeTimeTrade.value,URL_SERVICES.TradeP).then(data => {
			data.forEach((d, i) => {
						d.date = new Date((d.date));
					});
			this.setState({ array_post:data })
		})
  }

  getTrades(){
    var arrayParams=[];
    var objParam={param:'', value:''}

    objParam.param='book';
    objParam.value=this.state.activeCoin.book;
    arrayParams.push(objParam)

    callGetServices(URL_SERVICES.Trades,arrayParams).then(response => {

      this.setState({array_trades:response})
    }
  );
  }

  render() {
    if(this.state.ticketInfo!==null && this.state.array_trades!==null && this.state.array_post!==null && this.state.orderBooks!==null){
    return (
      <div className="App">
       <Header changeBook={this.changeBook} ticketInfo={this.state.ticketInfo} activeCoin={this.state.activeCoin}/>
       <BodySection orderBooks={this.state.orderBooks} changeRangeGraphic={this.changeRangeGraphic} activeTimeTrade={this.state.activeTimeTrade} array_post={this.state.array_post} array_trades={this.state.array_trades} activeCoin={this.state.activeCoin} />
      </div>
    );}
    else{
      return (
        <section className="loading-background">
        <section className='spinner-section'>
        <Spinner
        	     type="Puff"
               color="#384555"
               height="300"	
               width="300"
        />
        <h1>LOADING...</h1>
        </section>
        </section>
      );
    }
  }
}

export default App;
