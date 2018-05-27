import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS, autorun } from "mobx";
import BuyOrders from "../../components/buy_orders/BuyOrders";
import SellOrders from "../../components/sell_orders/SellOrders";
import theme from "./Orders.module.css";
import styles from "./Orders.module.css";

@inject("OrdersStore")
@inject("BooksStore")
@observer
class OrdersContainer extends Component {
  constructor(props) {
    super(props);

    const { BooksStore } = props;
    let websocket;
    const newSocket = () => {
      if (websocket) {
        websocket.close();
      }
      const book = BooksStore.book;
      websocket = new WebSocket("wss://ws.bitso.com");
      websocket.onopen = () => {
        websocket.send(JSON.stringify({ action: "subscribe", book: book, type: "diff-orders" }));
      };
      props.OrdersStore.clearOrders();
      websocket.onmessage = props.OrdersStore.getOrders;
    };

    autorun(newSocket);
  }

  render() {
    const { OrdersStore } = this.props;

    return (
      <div className={styles["grid-container"]}>
        <div className={styles.buy}>
          <BuyOrders orders={toJS(OrdersStore.buy)} theme={theme} />
        </div>
        <div className={styles.sell}>
          <SellOrders orders={toJS(OrdersStore.sell)} theme={theme} />
        </div>
      </div>
    );
  }
}

export default OrdersContainer;
