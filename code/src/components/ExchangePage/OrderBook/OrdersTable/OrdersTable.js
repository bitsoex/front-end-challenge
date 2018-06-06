import React from 'react';
import PropTypes from 'prop-types';

import Order from '../Order/Order';
import { formatCurrency } from '../../../../utils/utilities';
import './OrdersTable.css';

function OrdersTable({ book, orders }) {
  return (
    <table id="orders-table">
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

function OrdersTableHeader({ book }) {
  const currencies = book.toUpperCase().split('_');
  const base = currencies[0];
  const second = currencies[1];
  return (
    <thead>
      <tr>
        <th>SUM</th>
        <th><span className="dark-text">{base}</span> MONTO</th>
        <th><span className="dark-text">{second}</span> VALOR</th>
        <th><span className="dark-text">{second}</span> PRECIO</th>
      </tr>
    </thead>    
  );
}

OrdersTableHeader.propTypes = { book: PropTypes.string.isRequired };

function OrdersTableBody({ orders }) {
  let sum = 0;
  const totalSum = orders.reduce((total, order) => {
    const amount = parseFloat(order.amount);
    return total + amount;
  }, 0);

  const rows = orders.map((order) => {
    const amount = parseFloat(order.amount);
    const price = parseFloat(order.price);
    // Calculates the total value of the order
    const value = amount * price;
    // Calculates the accumulative of the bitcoins amount
    sum += amount;
    // Calculates the representative percentage of the order amount
    const weight = Math.ceil((amount / totalSum) * 100);

    const completeOrderData = {
      sum,
      weight,
      amount,
      value,
      price,
    };

    // TODO: use a real id
    return (<Order key={amount} order={completeOrderData} />);
  });
  return (
    <tbody>
      {rows}
    </tbody>
  );
}

OrdersTableBody.propTypes = { orders: PropTypes.array.isRequired };
