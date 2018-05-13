import React, { Component } from 'react';
import {URL_SERVICES} from './../../../Config.js';
import {PARAMS_SERVICES} from './../../../Config.js';
import {callGetServices} from './../../../Utils/CallServices.js';
import './CoinSection.css';

class CoinSection extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      btc_to_mxn:0
    }

    this.getBtcCost();
  }


  getBtcCost(){

    var arrayParams=[];
    var objParam={param:'', value:''}

    objParam.param='book';
    objParam.value=PARAMS_SERVICES.book_btc_mx;


    callGetServices(URL_SERVICES.Ticker,arrayParams).then(response => {
      
      
      
      console.log(response)
      this.setState({btc_to_mxn:response.payload.last})
    }
  
  );


  }

  render() {
    return (
      <section className="coin-section">
        <section className="view-exchange">
          <p>1 BTC = {this.state.btc_to_mxn}</p>
          
        </section>
       
      </section>
    );
  }
}

export default CoinSection;
