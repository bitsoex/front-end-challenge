import React from 'react';

import MARKETS_DATA from '../../../utils/books-mock-data';

function HeaderCurrencySelector({ selectorClick, dropdownOpen, currentBook, changeBook }) {
  const books = MARKETS_DATA.payload.map(market => market.book);
  const markets = books.map((book) => {
    const onClick = () => {
      selectorClick();
      changeBook(book);
    };
    return (
      <a key={book} onClick={onClick}>
        {book.toUpperCase().replace('_', '/')}
      </a>
    );
  });
  const dropdownClass = `dropdown-content${dropdownOpen ? ' active' : ''}`;
  return (
    <div className="currency-dropdown">
      <div className="dropdown">
        <div className="dropdown-button" onClick={selectorClick}>
          <span className="dropdown-button-text">{currentBook.toUpperCase().replace('_', '/')}</span>
          <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
        </div>
        <div className={dropdownClass}>{markets}</div>
      </div>
    </div>
  );
};

export default HeaderCurrencySelector;
