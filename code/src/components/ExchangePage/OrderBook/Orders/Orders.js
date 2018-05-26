import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Orders.css';

class Orders extends Component {
  render() {
    return (
      <section className={this.props.type === 'bid' ? 'orders-bids orders-container' : 'orders-asks orders-container'}>
        <header className="orders-header">
          <div>{this.props.title}</div>
          <div>{this.props.type} 319,140.00</div>
        </header>
        <table className="orders-table">
          <thead className="orders-table-head">
            <tr>
              <th />
              <th>SUM</th>
              <th>MONTO</th>
              <th>VALOR</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody className="orders-table-body">
            {
              this.props.orders.map((order) => {
                const { id, sum, amount, value, price } = order;
                return (
                  <tr key={id} className={id === 2 ? 'orders-active' : ''}>
                    <td />
                    <td>{sum}</td>
                    <td>{amount}</td>
                    <td className="orders-value">{value}</td>
                    <td className="orders-price">{price}</td>
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
};

export default Orders;
