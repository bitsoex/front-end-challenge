import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="exchange-header-fixed">
        <div>BTX/MXN DropDown</div>
        <div>Vol</div>
        <div>Max</div>
        <div>Min</div>
        <div>Var</div>
      </div>
    );
  }
}

export default Header;
