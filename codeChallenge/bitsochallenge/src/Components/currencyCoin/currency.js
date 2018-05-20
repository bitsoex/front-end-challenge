import React, { Component } from 'react';
import InfoCurrency from './tick/infoCurrency.js';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import './currency.css';


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
      <Toolbar className="Toolbar background-color black">
        <ToolbarGroup className="ToolbarGroup black">
          <InfoCurrency/>
        </ToolbarGroup>
      </Toolbar>
      </div>


    );
  }
}

export default Currency;
