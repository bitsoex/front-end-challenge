import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Orders.css';

class Orders extends Component {
  formatAmount(amount) {
    const number = amount.toString().split('.');
    const afterPoint = number[1].length;
    if(afterPoint >= 8) {
      return (<td>{amount.toFixed(8)}</td>);
    }
    return (
      <td>
        {amount}
        <span className="dark-text">
          {'0'.repeat(8 - afterPoint)}
        </span>
      </td>);
  }
  render() {
    const { title, type, orders } = this.props;
    let sum = 0;
    let id = 0;

    const sumPrice = orders.reduce((total, order) => {
      const price = parseFloat(order.price);
      return total + price;
    }, 0);
    const averagePrice = sumPrice / orders.length;

    const totalSum = orders.reduce((total, order) => {
      const amount = parseFloat(order.amount);
      return total + amount;
    }, 0);
    const formattedOrders = orders.map((order) => {
      const completedOrder = order;
      const amount = parseFloat(order.amount);
      const price = parseFloat(order.price);
      const value = amount * price;
      sum += amount;
      const weight = Math.ceil((amount / totalSum) * 100);
      completedOrder.amount = amount;
      completedOrder.price = price;
      completedOrder.value = value;
      completedOrder.sum = sum;
      completedOrder.weight = weight;
      completedOrder.id = id++;
      return completedOrder;
    });
    const currencies = this.props.book.toUpperCase().split('_');
    const base = currencies[0];
    const second = currencies[1];
    return (
      <section className={type === 'bid' ? 'orders-bids orders-container' : 'orders-asks orders-container'}>
        <header className="orders-header">
          <div>{title}</div>
          <div>{type[0].toUpperCase() + type.slice(1)} {averagePrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>
        </header>
        <table className="orders-table">
          <thead className="orders-table-head">
            <tr>
              <th>SUM</th>
              <th><span className="dark-text">{base}</span> MONTO</th>
              <th><span className="dark-text">{second}</span> VALOR</th>
              <th><span className="dark-text">{second}</span> PRECIO</th>
            </tr>
          </thead>
          <tbody className="orders-table-body">
            {
              formattedOrders.map((order) => {
                const { id, sum, amount, value, price, weight } = order;
                return (
                  <tr key={id} className={id === 2 ? 'orders-active orders-selected' : ''}>
                    <td className="order-sum">
                      <div className="order-sum-bar" style={{ width: weight }} />
                      <span>{sum.toFixed(2)}</span>
                    </td>
                    {this.formatAmount(amount)}
                    <td className="orders-value">{value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</td>
                    <td className="orders-price">{price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Orders.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default Orders;
