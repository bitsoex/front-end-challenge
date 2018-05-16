import React, { Component } from 'react';
import Header from './Components/header/header';
import BodyContent from './Components/body/BodyComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Header />
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
