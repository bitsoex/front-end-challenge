import React from 'react';
import PropTypes from 'prop-types';

const HeaderCurrencySelector = ({ selectorClick, dropdownOpen }) => {
  const currencies = [{ name: 'BTC/ETH' }, { name: 'ETH/MXN' }, { name: 'XRP/MXN' }];
  const elems = currencies.map(elem => (
    <a href="#" key={elem.name}>
      {elem.name}
    </a>
  ));
  const dropdownClass = `dropdown-content${dropdownOpen ? ' active' : ''}`;
  return (
    <div className="currency-dropdown">
      <div className="dropdown">
        <div className="dropdown-button" onClick={selectorClick}>
          <span className="dropdown-button-text">BTC/MXN</span>
          <img src="img/SVG/icon_dropdown.svg" alt="dropdown icon" className="dropdown-icon" />
        </div>
        <div className={dropdownClass}>{elems}</div>
      </div>
    </div>
  );
};

export default HeaderCurrencySelector;
