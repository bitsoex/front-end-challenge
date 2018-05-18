import React, { Component } from 'react';
import {URL_SERVICES} from './../../../config/Config.js';
import {SERVICE_REQUEST} from './../../../config/Config.js';
import {callGetService} from './../../../Utils/CallServices.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './tickComponent.css';

class TickCollection extends Component {
  constructor(props) {
    super(props);
    this.state={
      btcMxn:0,
      ethMxn:0,
      xrpMxn:0,
      ltcMxn:0,
      bchMxn:0,
      array_tick:[]
    }
    this.getBtcBook();
    this.getEthBook();
    this.getXrpBook();
    this.getLtcBook();
    this.getBchBook();
    this.state = {value: 1};
  }

  getBtcBook(){
      var arrayParams=[];
      var objParam={param:'', value:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_btc_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({btcMxn:response.payload.last})
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
      this.setState({ethMxn:response.payload.last})
      }
    );
  }
  getXrpBook(){
      var arrayParams=[];
      var objParam={param:'', value:'',mode:'',vmode:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_xrp_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({xrpMxn:response.payload.last})
      }
    );
  }
  getLtcBook(){
      var arrayParams=[];
      var objParam={param:'', value:'',mode:'',vmode:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_ltc_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.TickerProd,arrayParams).then(response => {
      this.setState({ltcMxn:response.payload.last})
      }
    );
  }
  getBchBook(){
      var arrayParams=[];
      var objParam={param:'', value:'',mode:'',vmode:''}
      objParam.param='book';
      objParam.value=SERVICE_REQUEST.book_bch_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.TickerProd,arrayParams).then(response => {
      this.setState({bchMxn:response.payload.last})
      }
    );
  }
  updatePrice(){
    this.getBtcBook();
    this.getEthBook();
    this.getXrpBook();
    this.getLtcBook();
    this.getBchBook();

  }
  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
          <DropDownMenu id='tickMenu' className=" DropDownMenu ToolbarTitle" value={this.state.value} onChange={this.handleChange} openImmediately={false} onClick={this.updatePrice.bind(this)}>
            <MenuItem value={1} primaryText={"1 BTC = "+this.state.btcMxn} />
            <MenuItem value={2} primaryText={"1 ETH = "+this.state.ethMxn} />
            <MenuItem value={3} primaryText={"1 XRP = "+this.state.xrpMxn} />
            <MenuItem value={4} primaryText={"1 LTC = "+this.state.ltcMxn} />
            <MenuItem value={5} primaryText={"1 BCH = "+this.state.bchMxn} />
          </DropDownMenu>
    );
  }
}

export default TickCollection;
