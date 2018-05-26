import React, { Component } from 'react';
import './MarketsSideBar.css';

class MarketsSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: false,
    };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState(prevState =>
      Object.assign({}, ...prevState, { sideBarOpen: !prevState.sideBarOpen }),
    );
  }

  render() {
    const width = this.state.sideBarOpen ? '250px' : '0';
    return (
      <div className="sidenav-wrapper">
        <div className="sidenav-toggle" onClick={this.toggleSideBar}>
          <div className="vertical-text">MARKETS</div>
        </div>
        <div id="mySidenav" className="sidenav-content" style={{ width }}>
          <a>List Of Charts</a>
          <a>Right</a>
          <a>Here</a>
        </div>
      </div>
    );
  }
}

export default MarketsSideBar;
