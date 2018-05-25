import React, { Component } from 'react';
import Header from './Components/header/header';
import BodyContent from './Components/body/BodyComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import {URL_SERVICES} from './config/Config.js';
import {SERVICE_REQUEST} from './config/Config.js';
import {callGetService} from './Utils/CallServices.js';

import './App.css';

const muiThemeDark = getMuiTheme({
  palette: {
    textColor: "#b0bac1",
    secondaryTextColor:"#4e5863",
    canvasColor: "#23292d",
    alternateTextColor: "#23292d",
    accent1Color: "#b0bac1",

  },
  drawer: {
      color: "#23292d"
    },
    tableHeaderColumn: {
           spacing: 0

       },
  tableRow: {
        selectedColor: "#ffeb3b",
        hoverColor: "#ffea00",
        tripeColor: "#ffea00",
        height: 20
    },

    tableRowColumn: {
        spacing: 10
      },
  tabs: {
          backgroundColor: "#23292d",
          textColor: "#b0bac1",
          selectedTextColor: "#4e5863",
          accent1Color: Colors.white
      },
  dropDownMenu: {
    accent1Color: Colors.white
  }
});

const lightThemeAlter = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: Colors.cyan500,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.grey400,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: "#4e5863",
      alternateTextColor:  "#23292d",
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: fade(Colors.darkBlack, 0.3),
      pickerHeaderColor: Colors.cyan500,
      clockCircleColor: fade(Colors.darkBlack, 0.07),
      shadowColor: Colors.fullBlack,
    },
    drawer: {
        color: Colors.white
      },
    tableRow: {
          selectedColor: "#ffeb3b",
          hoverColor: "#ffea00",
          tripeColor: "#ffea00",
          height: 10
      },
      tabs: {
              backgroundColor: "#23292d",
              textColor: "#b0bac1",
              selectedTextColor: "Colors.white",
          },
     tableHeader: {
            backgroundColor: Colors.white,
            spacing: 1

        }

});

class App extends Component {
  static childContextTypes = {
      changeTheme: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      theme:'darkBaseTheme',
      muiTheme: getMuiTheme(muiThemeDark),
      btcMxn:0,
      ethMxn:0,
      xrpMxn:0,
      ltcMxn:0,
      bchMxn:0,
      book_btc_mx:{},
      book_eth_mx:{},
      book_ltc_mx:{},
      book_xrp_mx:{},
      book_bch_mx:{}
    };
    this.getBtcBook();
    this.getEthBook();
    this.getXrpBook();
    this.getLtcBook();
    this.getBchBook();
  }
  getChildContext() {
  return {changeTheme: this.changeTheme};
  }
  componentDidMount(){

  }
changeTheme = () => {
   var newTheme =this.state.theme;
      if (this.state.theme==="darkBaseTheme"){
        newTheme='lightBaseTheme';
        this.setState({muiTheme: getMuiTheme(lightThemeAlter),theme:newTheme})
      }else{
        newTheme='darkBaseTheme';
        this.setState({muiTheme: getMuiTheme(muiThemeDark),theme:newTheme})
      }

};
/*******************TEST-Pasar info ua Vez*************************/
getBtcBook(){
    var arrayParams=[];
    var objParam={param:'', value:''}
    objParam.param='book';
    objParam.value=SERVICE_REQUEST.book_btc_mx;
    arrayParams.push(objParam);
    callGetService(URL_SERVICES.Ticker,arrayParams).then(response => {
    this.setState({btcMxn:response.payload.last,book_btc_mx:response})
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
    this.setState({ethMxn:response.payload.last,book_eth_mx:response})
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
    this.setState({xrpMxn:response.payload.last,book_xrp_mx:response})
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
    this.setState({ltcMxn:response.payload.last,book_ltc_mx:response})
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
    this.setState({bchMxn:response.payload.last,book_bch_mx:response})
    }
  );
}

/******************************************************************/
  componentDidMount(){
    document.title = "BitsoChallenge"
  }
  render() {
    return (

      <div className="App">
        <MuiThemeProvider muiTheme={this.state.muiTheme}>
          <Header
          book_btc_mx={this.state.book_btc_mx}
          book_eth_mx={this.state.book_eth_mx}
          book_xrp_mx={this.state.book_xrp_mx}
          book_ltc_mx={this.state.book_ltc_mx}
          book_bch_mx={this.state.book_bch_mx}
          />
          <div className="Toagleblock">
            <Toggle id="theme"
              valueLink={this.state.theme}
              onToggle={this.changeTheme.bind(this)}
              className="Toggle-toggle"
              />
          </div>
          <BodyContent/>
          <footer className="App-intro">
          © 2018 Bitso SAPI de CV. Todos los derechos reservados.
          </footer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
