import React from 'react';
import PropTypes from 'prop-types';

import OrdersContainerHeader from './OrdersContainerHeader/OrdersContainerHeader';
import OrdersTable from './OrdersTable/OrdersTable';

const containerStyles = {
  // Self
  width: '100%',
  height: '100%',
  padding: '5px',
  display: 'flex',
  // for Childs
  flexDirection: 'column',
};

function OrdersContainer({
  title, type, orders, book, isFirstFetch,
}) {
  const typeClass = type === 'bid' ? 'orders-bids' : 'orders-asks';

  const sumPrice = orders.reduce((total, order) => {
    const price = parseFloat(order.price);
    return total + price;
  }, 0);
  const averagePrice = orders.length > 0 ? sumPrice / orders.length : 0;

  return (
    <section className={typeClass} style={containerStyles}>
      <OrdersContainerHeader
        title={title}
        type={type}
        averagePrice={averagePrice}
      />
      <OrdersTable
        book={book}
        orders={orders}
        isFirstFetch={isFirstFetch}
      />
    </section>
  );
}

OrdersContainer.propTypes = {
  title: PropTypes.string.isRequired,
  book: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  isFirstFetch: PropTypes.bool.isRequired,
};

export default OrdersContainer;
