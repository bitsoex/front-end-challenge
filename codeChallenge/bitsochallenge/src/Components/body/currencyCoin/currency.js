import React, { Component } from 'react';
import InfoCurrency from './tick/infoCurrency.js';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import DrawerMarkets from './DrawerMarkets/DrawerMarkets.js';
import './currency.css';

const styles={
  toolbar:{
    height:30,
  }
}
class Currency extends Component {
  constructor(props) {
      super(props);
      this.state = {
        value: 1,

      };
    }

  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
      <div className="background-color black">
      <Toolbar className="Toolbar background-color black" style={styles.toolbar}>
        <ToolbarGroup className="ToolbarGroup black">
          <InfoCurrency/>
          <DrawerMarkets/>
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}

export default Currency;
