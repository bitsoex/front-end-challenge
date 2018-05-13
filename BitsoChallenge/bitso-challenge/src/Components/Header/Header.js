import React, { Component } from 'react';
import logo from './../../Assets/Images/SVG/bitso_logo.svg'
import CoinSection from './CoinSection/CoinSection';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <section className="header-section">
        <section className="header">
          <img className="logo" src={logo} alt="logo" />
          <p className="header-title">|</p>
          <p className="header-title">EXCHANGE</p>
        </section>
       
        <CoinSection/>

      </section>
    );
  }
}

export default Header;
