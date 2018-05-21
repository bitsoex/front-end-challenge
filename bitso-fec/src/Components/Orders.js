import React, { Component } from "react";
import Table from "./Table";

/**
 * Orders component that handle the two type of orders asks and bids.
 * @param {string} Actual Active book
 * @param {Object} orders Actual object of the last 50 asks and bids.
 */

class Orders extends Component {
  render() {
    const { book, orders } = this.props;
    return (
      <div className="div-block__content">
        <div className="dashboard-orders__table">
          <div className="dashboard__navy-header orders">
            <h4 className="lighter-text bold">POSTURAS DE COMPRA</h4>
            <div>Texto</div>
          </div>
          <Table orders={orders && orders.asks} book={book} type={"asks"} />
        </div>
        <div className="dashboard-orders__table bids">
          <div className="dashboard__navy-header orders">
            <div>Texto</div>
            <h4 className="lighter-text bold">POSTURAS DE VENTA</h4>
          </div>
          <Table orders={orders && orders.bids} book={book} type={"bids"} />
        </div>
      </div>
    );
  }
}

export default Orders;
