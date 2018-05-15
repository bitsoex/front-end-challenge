import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import BodySection from './Components/BodySection/BodySection';
import {BOOKS_AVAILABLES} from './Config'
import {URL_SERVICES} from './Config.js';
import {PARAMS_SERVICES} from './Config.js';
import {callGetServices} from './Utils/CallServices.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      activeCoin:BOOKS_AVAILABLES[0],
      ticketInfo:null,
      array_trades:null
    }
    this.getBtcCost();
    this.getTrades();
    this.changeBook=this.changeBook.bind(this);
    
  }

  changeBook(book){
    console.log('Entra a change book ' +JSON.stringify(book))
    
    this.state.activeCoin=book;
    this.getBtcCost();
    this.getTrades();

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


  getTrades(){

    //Get trades
    var arrayParams=[];
    var objParam={param:'', value:''}

    objParam.param='book';
    objParam.value=PARAMS_SERVICES.book_btc_mx;
    arrayParams.push(objParam)

    callGetServices(URL_SERVICES.Trades,arrayParams).then(response => {

      this.setState({array_trades:response})

      // this.setState({array_trades:[{created_at:'20:04',price:10000, amount:2000,maker_side:'buy'},{created_at:'20:04',price:10000, amount:2000,maker_side:'sell'},{created_at:'20:04',price:10000, amount:2000,maker_side:'buy'}]})
      // this.setState({btc_to_mxn:response.payload.last})
    }
  );
  }

  render() {
    if(this.state.ticketInfo!==null && this.state.array_trades!==null){
    return (
      <div className="App">
       <Header changeBook={this.changeBook} ticketInfo={this.state.ticketInfo} activeCoin={this.state.activeCoin}/>
       <BodySection array_trades={this.state.array_trades} activeCoin={this.state.activeCoin} />
      </div>
    );}
    else{
      return (
        <div className="App">
        </div>
      );
    }
  }
}

export default App;
