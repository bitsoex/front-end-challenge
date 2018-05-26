import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar-container-fixed">
        <div>Bitso Logo | Title Exchange</div>
        <div>Conversion Rate 1BTC = 0000 MXN</div>
        <div>Wallet DropDown</div>
        <div>Exchange DropDown</div>
        <div>Ayuda DropDown</div>
        <div>UserPic & User DropDown</div>
        <div>Toggle Dark/Light Mode</div>
      </div>
    );
  }
}

export default NavBar;
