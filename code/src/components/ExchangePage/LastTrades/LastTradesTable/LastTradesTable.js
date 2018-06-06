import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Trade from '../Trade/Trade';
import './LastTradesTable.css';

function LastTradesTable({ book, trades }) {
  return (
    <table id="trades-table">
      <LastTradesTableHeader book={book} />
      <LastTradesTableBody trades={trades} />
    </table>
  );
}

LastTradesTable.propTypes = {
  trades: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default LastTradesTable;

function LastTradesTableHeader({ book }) {
  const currencies = book.toUpperCase().split('_');
  const base = currencies[0];
  const second = currencies[1];
  return (
    <thead>
      <tr>
        <th>HORA</th>
        <th><span className="dark-text">{second}</span> PRECIO</th>
        <th><span className="dark-text">{base}</span> MONTO</th>
      </tr>
    </thead>
  );
}

LastTradesTableHeader.propTypes = {
  book: PropTypes.string.isRequired,
};

function LastTradesTableBody({ trades }) {
  return (
    <tbody>
      {
        trades.map(trade => <Trade key={trade.tid} trade={trade} />)
      }
    </tbody>
  );
}

LastTradesTableBody.propTypes = {
  trades: PropTypes.array.isRequired,
};
