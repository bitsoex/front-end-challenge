import React, { Component } from 'react';

import Market from './Market'
import { formatCurrency } from '../../../utils/utilities';
import './MarketsSideBar.css';
import MARKETS_DATA from '../../../utils/books-mock-data';

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
    const books = MARKETS_DATA.payload.map((market) => market.book);
    return (
      <div className="sidenav-wrapper">
        <SideBarToogle toogleSideBar={this.toggleSideBar} />
        <SideBarContent width={width} books={books} />
      </div>
    );
  }
}

export default MarketsSideBar;

function SideBarToogle({ toogleSideBar }) {
  return (
    <div className="sidenav-toggle" onClick={toogleSideBar}>
      <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
      <span className="vertical-text">MERCADOS</span>
    </div>
  );
}

function SideBarContent({ width, books }) {
  return (
    <div id="mySidenav" className="sidenav-content" style={{ width }}>
      <header className="markets-header">MERCADOS 24 HRS</header>
      {
        books.map(book => <Market key={book} book={book} />)
      }
    </div>
  );
}
