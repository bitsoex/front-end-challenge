import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";
import _ from "lodash";

import OrderData from "../Modules/OrderData";
import Table from "./Table";

class Orders extends Component {
  state = {
    loading: true,
    orders: null
  };

  async componentDidMount() {
    const { book, websocket } = this.props;
    let firstOrders = await axios.get("https://api.bitso.com/v3/order_book", {
      params: { book, aggregate: true }
    });

    firstOrders.data.payload.asks = _.map(
      firstOrders.data.payload.asks,
      order => {
        if (!order.oid) return _.assign(order, { oid: uuid() });
      }
    );
    firstOrders.data.payload.bids = _.map(
      firstOrders.data.payload.bids,
      order => {
        if (!order.oid) return _.assign(order, { oid: uuid() });
      }
    );

    websocket.onmessage = async message => {
      var data = JSON.parse(message.data);
      if (data.type === "trades" && data.payload) {
      } else if (data.type === "diff-orders" && data.payload) {
        const orderedOrders = await OrderData(firstOrders, data, book);
        this.setState({ orders: orderedOrders, loading: false });
      } else if (data.type === "orders" && data.payload) {
      }
    };
  }

  render() {
    const { loading, orders } = this.state;
    const { book } = this.props;
    if (loading) {
      return <div>Cargando...</div>;
    }
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
