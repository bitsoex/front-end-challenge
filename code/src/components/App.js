import React, { Component } from 'react';
import './App.less';
import ExchangePage from "./ExchangePage/ExchangePage";
import NavBar from "./common/Navbar/NavBar";

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <ExchangePage />
      </div>
    );
  }
}

export default App;
