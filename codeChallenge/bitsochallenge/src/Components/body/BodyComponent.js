import React, { Component } from 'react';
import LastTrades from './Trades/Trades';
import {Tabs, Tab} from 'material-ui/Tabs';
import CandlestickIcon from '../../Assets/Images/SVG/icon_candles.svg';
import Currency from './currencyCoin/currency';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import TabsChart from './graphicOptions/tabs.js'
import MenuItem from 'material-ui/MenuItem';
import Orders from './ordersActions/ActiveOrders.js';
import OrdersAsk from './ordersActions/ActiveOrdersAsk.js';
import './BodyComponent.css';

const styles={
  toolbar:{
    height:20,
    backgroundColor:"#23292d"
  },
  toolbarTitle:{
    padding:500,


  },
  customWidth: {
    width: 150,
  },
  customHeight:{
    height:12
  }
}

class BodyContent extends Component {
    constructor(props) {
        super(props);
        this.state={
          btc_to_mxn:0,
          period:1,
          book:"btc_mxn",
        }
      }
  renderGraphics(period){
    return(
      <TabsChart period={period}/>
    )
  }
  handleChange = (event, index, period) => this.setState({period});
  render() {
    return (
      <div className="lasTrades">
        <section>
          <Currency/>
          <Toolbar className="Toolbar background-color" style={styles.toolbar}>
            <ToolbarGroup className="ToolbarGroup">
              <div className="ToolbarTitle customAlign"><ToolbarTitle text="" /></div>
              <div>
                <DropDownMenu id="menuPeriod" className="DropDownMenu customAlign " style={styles.customHeight} value={this.state.period} onChange={this.handleChange} openImmediately={false}>
                  <MenuItem  value={1} primaryText="1 Mes" />
                  <MenuItem  value={2} primaryText="3 Meses" />
                  <MenuItem  value={3} primaryText="1 Año" />
                </DropDownMenu>
              </div>
            </ToolbarGroup>
          </Toolbar>
          <div className="lasTrades">
            <article>
              <LastTrades />
            </article>
          </div>
          {this.renderGraphics(this.state.period)}
          <section>
          <Orders className="ordersList" book={this.state.book}/>
          <OrdersAsk className="ordersList left" book={this.state.book}/>
          </section>
        </section>

      </div>
    );
  }
}

export default BodyContent;
