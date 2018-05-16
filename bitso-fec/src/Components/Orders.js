import React, { Component } from "react";
import Table from "./Table";

class Orders extends Component {
  render() {
    const { book, orders } = this.props;
    return (
      <div className="div-block__content">
        <div
          style={{
            marginRight: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div className="navy-header orders">
            <h4 className="lighter-text bold">POSTURAS DE COMPRA</h4>
            <div>Texto</div>
          </div>
          <Table orders={orders && orders.asks} book={book} type={"asks"} />
        </div>
        <div
          style={{
            marginLeft: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div className="navy-header orders">
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
