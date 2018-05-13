import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import BodySection from './Components/BodySection/BodySection';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <BodySection/>
      </div>
    );
  }
}

export default App;
