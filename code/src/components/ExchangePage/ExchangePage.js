import React, {Component} from 'react';
import ExchangeTrades from "./ExchangeTrades/ExchangeTrades";
import ExchangeChart from "./ExchangeChart/ExchangeChart";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeMarketsSideBar from "./ExchangeMarketsSideBar/ExchangeMarketsSideBar";
import ExchangeOffers from "./ExchangeOffers/ExchangeOffers";

class ExchangePage extends Component {
  render() {
    return (
      <div>
        <ExchangeHeader/>
        <ExchangeTrades />
        <ExchangeChart/>
        <ExchangeOffers/>
        <ExchangeMarketsSideBar/>
      </div>
    );
  }
}

export default ExchangePage;
