import React, { Component } from 'react';
import LastTrades from './Trades/Trades';
import {Tabs, Tab} from 'material-ui/Tabs';
import CandlestickIcon from '../../Assets/Images/SVG/icon_candles.svg';

import TabsChart from './graphicOptions/tabs.js'
import './BodyComponent.css';

class BodyContent extends Component {
    constructor(props) {
        super(props);
        this.state={
          btc_to_mxn:0,
        }
      }
  render() {
    return (
      <div className="lasTrades">
        <div className="lasTrades">
          <LastTrades />
        </div>
        <TabsChart />
      </div>
    );
  }
}

export default BodyContent;
