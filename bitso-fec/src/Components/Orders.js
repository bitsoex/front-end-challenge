import React, { Component } from "react";

import OrderData from "../Modules/OrderData";
import Table from "./Table";

class Orders extends Component {
  state = {
    orders: null
  };

  componentDidMount() {
    const { websocket, tempOrders } = this.props;

    websocket.onmessage = async message => {
      var data = JSON.parse(message.data);
      if (data.type === "trades" && data.payload) {
      } else if (data.type === "diff-orders" && data.payload) {
        const orderedOrders = await OrderData(tempOrders, data);
        console.log(orderedOrders);
        this.setState({ orders: orderedOrders });
      } else if (data.type === "orders" && data.payload) {
      }
    };
  }

  render() {
    const { orders } = this.state;
    const { book } = this.props;
    return (
      <div className="div-block__content">
        <div>
          <div className="header">
            <h3>POSTURAS DE COMPRA</h3>
          </div>
          <Table orders={orders && orders.asks} book={book} type={"asks"} />
        </div>
        <div>
          <h3>POSTURAS DE VENTA</h3>
          <Table orders={orders && orders.bids} book={book} type={"bids"} />
        </div>
      </div>
    );
  }
}

export default Orders;
