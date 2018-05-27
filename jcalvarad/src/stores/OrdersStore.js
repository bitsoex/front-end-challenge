import { observable, action } from "mobx";

export class OrdersStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  @observable buy = [];

  @observable sell = [];

  @action
  getOrders = message => {
    const data = JSON.parse(message.data);

    if (data.action === "subscribe") {
      console.log("Websocket subscribed", data);
    }

    if (data.type === "diff-orders" && data.payload) {
      const wspayload = data.payload[0];
      const arr = wspayload.t ? this.sell : this.buy;
      arr.unshift({
        rate: new Intl.NumberFormat().format(wspayload.r),
        amount: wspayload.a ? wspayload.a : "-",
        value: wspayload.v ? wspayload.v : "-"
      });
      if (arr.length >= 15) {
        arr.pop();
      }
      console.info(data);
    }
  };

  @action
  clearOrders = () => {
    this.buy = [];
    this.sell = [];
  };
}
