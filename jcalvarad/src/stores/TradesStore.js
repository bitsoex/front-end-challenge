import { observable, action } from "mobx";

export class TradesStore {
  @observable trades = [];

  @action
  getTrades = message => {
    var data = JSON.parse(message.data);
    var now = new Date();

    if (data.action === "subscribe") {
      console.log("Websocket subscribed", data);
    }

    if (data.type === "trades" && data.payload) {
      const wspayload = data.payload[0];
      this.trades.push({
        time: now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes() + ":" + (now.getSeconds() < 10 ? "0" : "") + now.getSeconds(),
        rate: new Intl.NumberFormat().format(wspayload.r),
        amount: wspayload.a,
        marker: wspayload.t
      });
      console.info(data);
    }
  };
}
