import { observable, action } from "mobx";

export class TradesStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  @observable trades = [];

  @action
  setAllTrades = message => {
    console.log("trades", message);
    const data = message.data.payload;

    this.trades = data.map(t => {
      const d = new Date(t.created_at);
      return {
        time: d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds(),
        rate: new Intl.NumberFormat().format(parseFloat(t.price)),
        amount: parseFloat(t.amount),
        marker: t.marker_side === "buy" ? 0 : 1
      };
    });
  };

  @action
  getTrades = message => {
    const data = JSON.parse(message.data);
    const now = new Date();

    if (data.action === "subscribe") {
      console.log("Websocket subscribed", data);
    }

    if (data.type === "trades" && data.payload) {
      const wspayload = data.payload[0];
      this.trades.unshift({
        time: now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes() + ":" + (now.getSeconds() < 10 ? "0" : "") + now.getSeconds(),
        rate: new Intl.NumberFormat().format(wspayload.r),
        amount: wspayload.a,
        marker: wspayload.t
      });
      if (this.trades.length >= 30) {
        this.trades.pop();
      }
      console.info(data);
    }
  };
}
