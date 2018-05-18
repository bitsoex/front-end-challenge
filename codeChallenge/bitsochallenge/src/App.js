import React, { Component } from 'react';
import Header from './Components/header/header';
import Currency from './Components/currencyCoin/currency';
import BodyContent from './Components/body/BodyComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'colors';

import './App.css';

const muiTheme = getMuiTheme({
palette: {
  textColor: grey400,
  }
});

class App extends Component {
  componentDidMount(){
    document.title = "BitsoChallenge"
  }

  render() {
    return (

      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Header />
          <Currency/>
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
