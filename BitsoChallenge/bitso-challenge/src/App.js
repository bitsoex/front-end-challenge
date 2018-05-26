import React, { Component } from 'react';
import Spinner from 'react-loader-spinner';
import './App.css';
import Header from './Components/Header/Header';
import BodySection from './Components/BodySection/BodySection';
import {BOOKS_AVAILABLES} from './Config'
import {URL_SERVICES} from './Config.js';
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
      orderBooks:null,
      arrayBooks:null
    }

    //Timmer to update info
    this.interval = setInterval(() => {
      this.getAllServices();
  }, 4000)

  this.getAllServices();
    this.changeBook=this.changeBook.bind(this);
    this.changeRangeGraphic=this.changeRangeGraphic.bind(this)
  }

  //Call all used services
  getAllServices(){
    this.getBtcCost();
    this.getTrades();
    this.getGraphic();
    this.getOrderBook();
    this.getBooks();
  }

  //Update info with the boook selected
  changeBook(book){
    this.state.activeCoin=book;
    this.getBtcCost();
    this.getTrades();
    this.getGraphic();
    this.getOrderBook();
  }

  //Update date range to chart
  changeRangeGraphic(range){
    this.state.activeTimeTrade=range;
    this.getGraphic();
  }

  //Service used in postures
  getOrderBook(){
    var arrayParams=[];
    var objParam={param:'', value:''}
    objParam.param='book';
    objParam.value=this.state.activeCoin.book;
    arrayParams.push(objParam);
    callGetServices(URL_SERVICES.OrderBook,arrayParams).then(response => {
      if(response!=='error'){
      var sumBid=0;
      response.payload.bids.forEach(bid => {
        sumBid=(+sumBid)+(+bid.amount);
        bid.valor=(bid.amount*bid.price)


         bid.valor=(+bid.valor).toFixed(8);
         bid.amount=(+bid.amount).toFixed(8);
         bid.price=(+bid.price).toFixed(8);
        bid.sum=sumBid.toFixed(8);
      });
      response.payload.totSumBid=sumBid;

      var sumAsk=0
      response.payload.asks.forEach(ask => {
        sumAsk=(+sumAsk)+(+ask.amount);
        ask.valor=(ask.amount*ask.price)
        ask.valor=(+ask.valor).toFixed(8);
        ask.amount=(+ask.amount).toFixed(8);
        ask.price=(+ask.price).toFixed(8);
        ask.sum=sumAsk.toFixed(8);
      });
      response.payload.totSumAsk=sumAsk;
    }
      this.setState({orderBooks:response});
    }
  
  );
  }

  //Get actual value to initial selected coin
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

  //Get info used in chart
  getGraphic(){
    getData(this.state.activeCoin.book,this.state.activeTimeTrade.value,URL_SERVICES.TradeP).then(data => {
      if(data!=='error'){
			data.forEach((d, i) => {
						d.date = new Date((d.date));
          });
        }
			this.setState({ array_post:data })
		})
  }

  //Get trades
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
  //Get all info books
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

  render() {
    if(this.state.ticketInfo!==null && this.state.array_trades!==null && this.state.array_post!==null && this.state.orderBooks!==null && this.state.arrayBooks!==null){
      if(this.state.ticketInfo!=='error' && this.state.array_trades!=='error' && this.state.array_post!=='error' && this.state.orderBooks!=='error' &&this.state.arrayBooks!=='error'){
        return (
          <div className="App">
           <Header arrayBooks={this.state.arrayBooks} changeBook={this.changeBook} ticketInfo={this.state.ticketInfo} activeCoin={this.state.activeCoin}/>
           <BodySection orderBooks={this.state.orderBooks} changeRangeGraphic={this.changeRangeGraphic} 
           activeTimeTrade={this.state.activeTimeTrade} array_post={this.state.array_post} 
           array_trades={this.state.array_trades} activeCoin={this.state.activeCoin}
           ticketInfo={this.state.ticketInfo} 
           arrayBooks={this.state.arrayBooks} />
          </div>
        );
      }else{
        return (
          <section className="loading-background">
          <section className='spinner-section'>
          <Spinner
                 type="Puff"
                 color="#384555"
                 height="300"	
                 width="300"
          />
          <h1>Sistema no disponble intente mas tarde...</h1>
          </section>
          </section>
        );
  }
  }
    else {

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
