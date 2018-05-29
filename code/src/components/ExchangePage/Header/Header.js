import React, { Component } from 'react';
import './Header.css';
import HeaderIndicators from './HeaderIndicators';
import HeaderCurrencySelector from './HeaderCurrencySelector';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.selectorClick = this.selectorClick.bind(this);
  }

  selectorClick() {
    console.log('Clicked');
    this.setState(prevState =>
      Object.assign({}, ...prevState, { dropdownOpen: !prevState.dropdownOpen }),
    );
  }

  render() {
    return (
      <div className="header-fixed">
        <HeaderCurrencySelector
          selectorClick={this.selectorClick}
          dropdownOpen={this.state.dropdownOpen}
        />
        <HeaderIndicators />
      </div>
    );
  }
}

export default Header;
