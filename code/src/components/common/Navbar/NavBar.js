import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { lightTheme: false }

    this.toogleTheme = this.toogleTheme.bind(this)
  }

  toogleTheme() {
    console.log('Change theme');
    this.setState(prevState =>
      Object.assign({}, ...prevState, { lightTheme: !prevState.lightTheme }),
    );
  }

  render() {
    return (
      <div className="navbar-container-fixed">
        <div className="navbar-left">
          <img className="navbar-logo" src="img/SVG/bitso_logo.svg" alt="Bitso Logo" />
          <h4>EXCHANGE</h4>
        </div>
        <div className="navbar-right">
          <div className="navbar-conversion-rate">1BTC = 0000 MXN</div>
          <div className="navbar-item">
            <span>Wallet</span>
            <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
          </div>
          <div className="navbar-item">
            <span>Exchange</span>
            <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
          </div>
          <div className="navbar-item">
            <span>Ayuda</span>
          </div>
          <div className="navbar-item navbar-user">
            <div className="navbar-user-img" />
            <div className="navbar-user-text">
              <span>User</span>
              <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
            </div>
          </div>
          <div className="navbar-item">
            <div className="navbar-switch">
              <input type="checkbox" checked={this.state.lightTheme} />
              <span className="navbar-slider" onClick={this.toogleTheme} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
