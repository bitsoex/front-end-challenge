import React from 'react';
import PropTypes from 'prop-types';

import Order from '../Order/Order';
import './OrdersTable.css';

function OrdersTable({ book, orders, isFirstFetch }) {
  return (
    <table id="orders-table">
      <OrdersTableHeader book={book} />
      <OrdersTableBody orders={orders} isFirstFetch={isFirstFetch} />
    </table>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
  isFirstFetch: PropTypes.bool.isRequired,
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

function OrdersTableBody({ orders, isFirstFetch }) {
  let sum = 0;
  const totalSum = orders.reduce((total, order) => total + order.amount, 0);

  const rows = orders.map((order) => {
    const { id, amount, price, value } = order;
    // Calculates the accumulative of the bitcoins amount
    sum += amount;
    // Calculates the representative percentage of the order amount
    const weight = Math.ceil((amount / totalSum) * 100);

    const completeOrderData = {
      id,
      price,
      amount,
      value,
      sum,
      weight,
    };
    return (<Order key={id} order={completeOrderData} isFirstFetch={isFirstFetch}/>);
  });
  return (
    <tbody>
      {rows}
    </tbody>
  );
}

OrdersTableBody.propTypes = {
  orders: PropTypes.array.isRequired,
  isFirstFetch: PropTypes.bool.isRequired,
};
