import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable/OrdersTable';

const containerStyles = {
  // Self
  width: '100%',
  height: '100%',
  padding: '5px',
  display: 'flex',
  maxHeight: '44.5vh',
  overflow: 'auto',
  // for Childs
  flexDirection: 'column',
};

function Orders({
  title, type, orders, book,
}) {
  const typeClass = type === 'bid' ? 'orders-bids' : 'orders-asks';
  
  const sumPrice = orders.reduce((total, order) => {
    const price = parseFloat(order.price);
    return total + price;
  }, 0);
  const averagePrice = orders.length > 0 ? sumPrice / orders.length : 0;
  
  return (
    <section className={`orders-container ${typeClass}`} style={containerStyles}>
      <OrdersHeader
        title={title}
        type={type}
        averagePrice={averagePrice} />
      <OrdersTable
        book={book}
        orders={orders} />
    </section>
  );
}

Orders.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default Orders;
