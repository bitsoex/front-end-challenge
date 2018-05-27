import { observable, action } from "mobx";

export class CandlesStore {
  @observable candles = [];
  @observable volume = [];

  @action
  setCandlesChart = message => {
    this.candles = message.data.map(c => {
      return [new Date(c.date).getTime(), parseFloat(c.open), parseFloat(c.high), parseFloat(c.low), parseFloat(c.close)];
    });

    this.volume = message.data.map(c => {
      return [new Date(c.date).getTime(), parseFloat(c.volume)];
    });
  };
}
