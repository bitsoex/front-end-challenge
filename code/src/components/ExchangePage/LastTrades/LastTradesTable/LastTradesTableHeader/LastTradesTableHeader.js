import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LastTradesTableHeader.css';

function LastTradesTableHeader({ book }) {
  const currencies = book.toUpperCase().split('_');
  const base = currencies[0];
  const second = currencies[1];
  return (
    <thead className="trades-table-head">
      <tr>
        <th>HORA</th>
        <th><span className="trades-table-head-currency">{second}</span> PRECIO</th>
        <th><span className="trades-table-head-currency">{base}</span> MONTO</th>
      </tr>
    </thead>
  );
}

LastTradesTableHeader.propTypes = {
  book: PropTypes.string.isRequired,
};

export default LastTradesTableHeader;
