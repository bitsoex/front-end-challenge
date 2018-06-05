import React from 'react';
import PropTypes from 'prop-types';

import Order from './Order';
import { formatCurrency } from '../../../../../../utils/utilities';
import './OrdersTableBody.css';

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
    <tbody className="orders-table-body">
      {rows}
    </tbody>
  );
}

OrdersTableBody.propTypes = { orders: PropTypes.array.isRequired };

export default OrdersTableBody;
