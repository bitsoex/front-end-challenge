import React, { Component } from 'react';

import NavbarConversionRate from './NavbarConversionRate/NavbarConversionRate'
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { hasLightTheme: false }

    this._toogleTheme = this._toogleTheme.bind(this)
  }

  _toogleTheme() {
    console.log('Change theme');
    this.setState(prevState =>
      Object.assign({}, ...prevState, { hasLightTheme: !prevState.hasLightTheme }),
    );
  }

  render() {
    return (
      <div id="navbar-container-fixed">
        <NavbarLeft>
          <Logo />
          <Title />
        </NavbarLeft>
        <NavbarRight>
          <NavbarConversionRate />
          <NavbarDropdown label="Wallet" />
          <NavbarDropdown label="Exchange" />
          <NavbarLink label="Ayuda" />
          <NavbarUser />
          <NavbarToogle
            hasLightTheme={this.state.hasLightTheme}
            toogleTheme={this._toogleTheme}
          />
        </NavbarRight>
      </div>
    );
  }
}

export default NavBar;

function NavbarLeft(props) {
  return (
    <div id="navbar-left">
      {props.children}
    </div>
  );
}

function Logo() {
  return <img id="navbar-logo" src="img/SVG/bitso_logo.svg" alt="Bitso Logo" />
}

function Title() {
  return <h4 id="navbar-title">EXCHANGE</h4>
}

function NavbarRight(props) {
  return (
    <div id="navbar-right">
      {props.children}
    </div>
  );
}

function NavbarDropdown({ label }) {
  return(
    <div className="navbar-item">
      <span>{label}</span>
      <img className="dropdown-icon" src="img/SVG/icon_dropdown.svg" alt="dropdown icon" />
    </div>
  );
}

function NavbarLink({ label }) {
  return(
    <div className="navbar-item">
      <a className="navbar-link" href="#">{label}</a>
    </div>
  );
}

function NavbarUser(){
  return (
    <div className="navbar-item navbar-user">
      <div className="navbar-user-img" />
      <NavbarDropdown
        className="navbar-user-text"
        label="User"
      />
    </div>
  );
}

function NavbarToogle({ hasLightTheme, toogleTheme }) {
  return (
    <div className="navbar-item">
      <div className="navbar-switch">
        <input type="checkbox" checked={hasLightTheme} />
        <span className="navbar-slider" onClick={toogleTheme} />
      </div>
    </div>
  );
}
