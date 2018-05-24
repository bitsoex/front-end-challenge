import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import BuyOrders from "../../components/buy_orders/BuyOrders";
import theme from "./Orders.module.css";

@inject("OrdersStore")
@observer
class OrdersContainer extends Component {
  constructor(props) {
    super(props);
    const websocket = new WebSocket("wss://ws.bitso.com");

    websocket.onopen = function() {
      websocket.send(JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "diff-orders" }));
    };

    websocket.onmessage = props.OrdersStore.getOrders;
  }

  render() {
    const { OrdersStore } = this.props;

    return (
      <div>
        <BuyOrders orders={toJS(OrdersStore.buy)} theme={theme} />
      </div>
    );
  }
}

export default OrdersContainer;
