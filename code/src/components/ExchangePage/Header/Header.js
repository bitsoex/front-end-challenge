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

    this._selectorClick = this._selectorClick.bind(this);
  }

  _selectorClick() {
    console.log('Clicked');
    this.setState(prevState =>
      Object.assign({}, ...prevState, { dropdownOpen: !prevState.dropdownOpen }),
    );
  }

  render() {
    return (
      <div className="header-fixed">
        <HeaderCurrencySelector
          selectorClick={this._selectorClick}
          dropdownOpen={this.state.dropdownOpen}
          currentBook={this.props.currentBook}
          changeBook={this.props.changeBook}
        />
        <HeaderIndicators />
      </div>
    );
  }
}

export default Header;
