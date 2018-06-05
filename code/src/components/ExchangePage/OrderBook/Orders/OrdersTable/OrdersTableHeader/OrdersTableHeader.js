import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './OrdersTableHeader.css';

function OrdersTableHeader({ book }) {
  const currencies = book.toUpperCase().split('_');
  const base = currencies[0];
  const second = currencies[1];
  return (
    <thead className="orders-table-head">
      <tr>
        <th>SUM</th>
        <th><span className="orders-table-head-currency">{base}</span> MONTO</th>
        <th><span className="orders-table-head-currency">{second}</span> VALOR</th>
        <th><span className="orders-table-head-currency">{second}</span> PRECIO</th>
      </tr>
    </thead>    
  );
}

OrdersTableHeader.propTypes = { book: PropTypes.string.isRequired };

export default OrdersTableHeader;
