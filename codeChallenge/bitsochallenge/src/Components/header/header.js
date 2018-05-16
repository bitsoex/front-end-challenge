import React, { Component } from 'react';
import bitsoLogo from '../../Assets/Images/SVG/bitso_logo.svg'
import TickCollection from './tick/tickComponent.js';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import './header.css';
class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
        value: 3,
      };
    }

  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (

      <div className="background-color">
      <Toolbar className="Toolbar background-color">
        <ToolbarGroup className="ToolbarGroup">
          <img className="bitsoLogo" src={bitsoLogo} alt="bitsoLogo" />
          <ToolbarSeparator />
          <div className="ToolbarTitle">
            <ToolbarTitle text="EXCHANGE" />
          </div>
          <TickCollection/>
          <ToolbarSeparator />
          <div className="ToolbarTitle"><ToolbarTitle text="Usuario" /><IconMenu
            iconButtonElement={
              <IconButton touch={true} >
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
          </div>
        </ToolbarGroup>
      </Toolbar>
      </div>


    );
  }
}

export default Header;
