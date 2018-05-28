import React, { Component } from 'react';

import Navbar_main from "./Components/Navbar_main.js";
import Main_dashboard from "./Components/Main_dashboard.js";

class App extends Component {
  render() {
    return [<Navbar_main/>,<Main_dashboard/>];
  }
}

export default App;