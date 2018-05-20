import React, { Component } from 'react';
import {URL_SERVICES} from './../../../config/Config.js';
import {SERVICE_REQUEST} from './../../../config/Config.js';
import {callGetService} from './../../../Utils/CallServices.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import './infoCurrency.css';

class InfoCurrency extends Component {
  constructor(props) {
    super(props);
    this.state={
      respBtc:'',
      respEth:'',
      respXrp:'',
      respLtc:'',
      respBch:'',
      btcMxn:0,
      ethMxn:0,
      xrpMxn:0,
      ltcMxn:0,
      bchMxn:0,
      volume24:0,
      value: 1,
      book :'',
      volume:'',
      high:'',
      last:'',
      low:'',
      vwap:'',
      ask:'',
      bid:'',
      created_at:''

    }
  }
  componentDidMount(){

    this.getBtcBook();
    this.getEthBook();
    this.getXrpBook();
    this.getLtcBook();
    this.getBchBook();

  }
  getBtcBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_btc_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({btcMxn:response.payload.last,respBtc:response});
      {
      this.setState({book	:this.state.respBtc.payload.book,
                     volume:this.state.respBtc.payload.volume,
                     high:this.state.respBtc.payload.high,
                     last:this.state.respBtc.payload.last,
                     low:this.state.respBtc.payload.low,
                     vwap:this.state.respBtc.payload.vwap,
                     ask:this.state.respBtc.payload.ask,
                     bid:this.state.respBtc.payload.bid,
                     created_at	:this.state.respBtc.payload.created_at  });
      }

      }
    );
  }
  getEthBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_eth_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({ethMxn:response.payload.last,respEth:response})
      }
    );
  }
  getXrpBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_xrp_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({xrpMxn:response.payload.last,respXrp:response})
      }
    );
  }
  getLtcBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_ltc_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.TickerProd,arrayParams).then(response => {
      this.setState({ltcMxn:response.payload.last,respLtc:response})
      }
    );
  }
  getBchBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_bch_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.TickerProd,arrayParams).then(response => {
      this.setState({bchMxn:response.payload.last,respBch:response})
      }
    );
  }

  handleChange = (event, index, value) => this.setState({value});
  onChangeEvent = (event, index, value) => {
    this.setState({value});
    switch (value){
      case 0:  this.getBtcBook();
               {this.setState({book	:this.state.respBtc.payload.book,
                               volume:this.state.respBtc.payload.volume,
                               high:this.state.respBtc.payload.high,
                               last:this.state.respBtc.payload.last,
                               low:this.state.respBtc.payload.low,
                               vwap:this.state.respBtc.payload.vwap,
                               ask:this.state.respBtc.payload.ask,
                               bid:this.state.respBtc.payload.bid,
                               created_at	:this.state.respBtc.payload.created_at  });
                               console.log("book: "+this.state.book);
                               console.log("Volume: "+this.state.volume);
                               console.log("high: "+this.state.high);
                               console.log("last: "+this.state.last);
                               console.log("bid: "+this.state.bid);

                             }
        break;
      case 1:  this.getEthBook();
              console.log('Etherium :' + JSON.stringify(this.state.respEth))
               {this.setState({book	:this.state.respEth.payload.book,
                           volume:this.state.respEth.payload.volume,
                           high:this.state.respEth.payload.high,
                           last:this.state.respEth.payload.last,
                           low:this.state.respEth.payload.low,
                           vwap:this.state.respEth.payload.vwap,
                           ask:this.state.respEth.payload.ask,
                           bid:this.state.respEth.payload.bid,
                           created_at	:this.state.respEth.payload.created_at  });

                         }
                         console.log("book: "+this.state.book);
                         console.log("Volume: "+this.state.volume);
                         console.log("high: "+this.state.high);
                         console.log("last: "+this.state.last);
                         console.log("bid: "+this.state.bid);

        break;
      case 2:  this.getXrpBook();
        console.log('RIPPLE :' + JSON.stringify(this.state.respXrp))
       {this.setState({book	:this.state.respXrp.payload.book,
                   volume:this.state.respXrp.payload.volume,
                   high:this.state.respXrp.payload.high,
                   last:this.state.respXrp.payload.last,
                   low:this.state.respXrp.payload.low,
                   vwap:this.state.respXrp.payload.vwap,
                   ask:this.state.respXrp.payload.ask,
                   bid:this.state.respXrp.payload.bid,
                   created_at	:this.state.respXrp.payload.created_at  });

                 }
                 console.log("book: "+this.state.book);
                 console.log("Volume: "+this.state.volume);
                 console.log("high: "+this.state.high);
                 console.log("last: "+this.state.last);
                 console.log("bid: "+this.state.bid);

                break;
      case 3:  this.getLtcBook();
      console.log('LITECOIN :' + JSON.stringify(this.state.respLtc))
     {this.setState({book	:this.state.respLtc.payload.book,
                 volume:this.state.respLtc.payload.volume,
                 high:this.state.respLtc.payload.high,
                 last:this.state.respLtc.payload.last,
                 low:this.state.respLtc.payload.low,
                 vwap:this.state.respLtc.payload.vwap,
                 ask:this.state.respLtc.payload.ask,
                 bid:this.state.respLtc.payload.bid,
                 created_at	:this.state.respLtc.payload.created_at  });

               }
               console.log("book: "+this.state.book);
               console.log("Volume: "+this.state.volume);
               console.log("high: "+this.state.high);
               console.log("last: "+this.state.last);
               console.log("bid: "+this.state.bid);

              break;
      case 4:  this.getBchBook();
      console.log('BCH :' + JSON.stringify(this.state.respBch))
     {this.setState({book	:this.state.respBch.payload.book,
                 volume:this.state.respBch.payload.volume,
                 high:this.state.respBch.payload.high,
                 last:this.state.respBch.payload.last,
                 low:this.state.respBch.payload.low,
                 vwap:this.state.respBch.payload.vwap,
                 ask:this.state.respBch.payload.ask,
                 bid:this.state.respBch.payload.bid,
                 created_at	:this.state.respBch.payload.created_at  });

               }
               console.log("book: "+this.state.book);
               console.log("Volume: "+this.state.volume);
               console.log("high: "+this.state.high);
               console.log("last: "+this.state.last);
               console.log("bid: "+this.state.bid);

              break;
    }
  }
  render() {
    return (
      <ToolbarGroup>
            <DropDownMenu   value={this.state.value} onChange={this.onChangeEvent.bind(this,this)} openImmediately={false}>
              <MenuItem value={0} primaryText="BTC/MXN" />
              <MenuItem value={1} primaryText="ETH/MXN" />
              <MenuItem value={2} primaryText="XRP/MXN" />
              <MenuItem value={3} primaryText="LTC/MXN" />
              <MenuItem value={4} primaryText="BCH/MXN" />
            </DropDownMenu>
        <div className="ToolbarTitle dark"> <ToolbarTitle text="Volume 24 hours: " /><span className="light">{this.state.volume}</span> </div>
        <div className="ToolbarTitle dark"> <ToolbarTitle text="Max.: " /><span className="light">{this.state.high}</span> </div>
        <div className="ToolbarTitle dark"> <ToolbarTitle text="Min.: " /><span className="light">{this.state.low}</span> </div>
        <div className="ToolbarTitle dark"> <ToolbarTitle text="Variación.: " /><span className="light">{this.state.vwap}</span> </div>
      </ToolbarGroup>
    );
  }
}

export default InfoCurrency;
