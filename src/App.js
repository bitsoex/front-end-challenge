import React, { Component } from 'react';

import NavbarMain from "./Components/NavbarMain.js";
import MainDashboard from "./Components/MainDashboard.js";

class App extends Component {
  render() {
    return [<NavbarMain/>,<MainDashboard/>];
  }
}

export default App;