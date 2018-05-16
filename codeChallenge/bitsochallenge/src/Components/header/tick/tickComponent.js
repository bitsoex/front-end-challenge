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
      array_tick:[]
    }
    this.getBtcBook();
    this.getEthBook();
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
      objParam.value=SERVICE_REQUEST.book_eth_mx;
      arrayParams.push(objParam);
      callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
      this.setState({btcMxn:response.payload.last})
      }
    );
  }
  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
      <div className="ToolbarTitle">
          <DropDownMenu className="ToolbarTitle" value={this.state.value} onChange={this.handleChange} openImmediately={false}>
            <MenuItem value={1} primaryText={"1 BTC "+this.state.btcMxn} />
            <MenuItem value={2} primaryText={"1 ETH "+this.state.ethMxn} />
          </DropDownMenu>
      </div>
    );
  }
}

export default TickCollection;
