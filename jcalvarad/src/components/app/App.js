import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import '../../assets/react-toolbox/theme.css';
import theme from '../../assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet" />
          </Helmet>

        <h1>My new Bitso App </h1>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
