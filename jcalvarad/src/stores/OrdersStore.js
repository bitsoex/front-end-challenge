import { observable, action } from "mobx";

const websocket = new WebSocket("wss://ws.bitso.com");

websocket.onopen = function() {
  websocket.send(JSON.stringify({ action: "subscribe", book: "btc_mxn", type: "diff-orders" }));
};

export class OrdersStore {
  @observable buy = [];

  @observable sell = [];

  @action
  getTrades = message => {
    var data = JSON.parse(message.data);
    var now = new Date();

    if (data.type === "trades" && data.payload) {
      const wspayload = data.payload[0];
      const arr = wspayload.t ? this.sell : this.buy;
      arr.push({
        rate: new Intl.NumberFormat().format(wspayload.r),
        amount: wspayload.a,
        value: wspayload.v
      });
      console.log(data);
    } else {
      console.log("error", data);
    }
  };
}
