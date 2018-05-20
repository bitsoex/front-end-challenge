import React, { Component } from 'react';
import Header from './Components/header/header';
import Currency from './Components/currencyCoin/currency';
import BodyContent from './Components/body/BodyComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  static childContextTypes = {
      changeTheme: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
    theme:'darkBaseTheme',
    muiTheme: getMuiTheme(darkBaseTheme)

    };
  }
  getChildContext() {
  return {changeTheme: this.changeTheme};
  }

changeTheme = () => {
   var newTheme =this.state.theme;
      if (this.state.theme==="darkBaseTheme"){
        newTheme='lightBaseTheme';
        console.log('CAMBIOLIGHT: '+newTheme);
        this.setState({muiTheme: getMuiTheme(lightBaseTheme),theme:newTheme})
      }else{
        newTheme='darkBaseTheme';
        console.log('CAMBIODARK: '+newTheme);
        this.setState({muiTheme: getMuiTheme(darkBaseTheme),theme:newTheme})
      }

};

  componentDidMount(){
    document.title = "BitsoChallenge"
  }
  render() {
    return (

      <div className="App">
        <MuiThemeProvider id='muiTheme'  muiTheme={this.state.muiTheme}>
        <div>
          <Header />
          <div className="Toagleblock">
            <Toggle id="theme"
              valueLink={this.state.theme}
              onToggle={this.changeTheme.bind(this)}
              className="Toggle-toggle"
            />

          </div>
          <Currency/>
          <BodyContent/>
          <footer className="App-intro">
          © 2018 Bitso SAPI de CV. Todos los derechos reservados.
          </footer>
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
