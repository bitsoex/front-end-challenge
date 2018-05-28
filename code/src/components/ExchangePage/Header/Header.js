import React, { Component } from 'react';
import './Header.css';
import './HeaderIndicators';
import HeaderIndicators from './HeaderIndicators';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.currencyClick = this.currencyClick.bind(this);
  }

  currencyClick() {
    console.log('Clicked');
    this.setState(prevState =>
      Object.assign({}, ...prevState, { dropdownOpen: !prevState.dropdownOpen }),
    );
  }

  render() {
    const dropdownClass = `dropdown-content${this.state.dropdownOpen ? ' active' : ''}`;
    return (
      <div className="header-fixed">
        <div className="currency-dropdown">
          <div className="dropdown">
            <div className="dropdown-button" onClick={this.currencyClick}>
              <span className="dropdown-button-text">BTC/MXN</span>
              <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
            </div>
            <div className={dropdownClass}>
              <a>BTC/ETH</a>
              <a>ETH/MXN</a>
              <a>XRP/MXN</a>
            </div>
          </div>
        </div>
        <HeaderIndicators />
      </div>
    );
  }
}

export default Header;
