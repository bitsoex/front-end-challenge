import React, { Component } from 'react';
import bitsoLogo from '../../Assets/Images/SVG/bitso_logo.svg'
import InfoCurrency from './tick/infoCurrency.js';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
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
