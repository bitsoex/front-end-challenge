import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrdersTableHeader from './OrdersTableHeader/OrdersTableHeader';
import OrdersTableBody from './OrdersTableBody/OrdersTableBody';
import './OrdersTable.css';

function OrdersTable({ book, orders }) {
  return (
    <table className="orders-table">
      <OrdersTableHeader book={book} />
      <OrdersTableBody orders={orders} />
    </table>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default OrdersTable;
