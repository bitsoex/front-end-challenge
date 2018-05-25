import React, { Component } from 'react';
import bitsoLogo from '../../Assets/Images/SVG/bitso_logo.svg'
import TickCollection from './tick/tickComponent.js';
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';



import './header.css';



class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
        value: 1,
        theme:'darkBaseTheme',
        book_eth_mx:{},
        book_btc_mx:{},
        book_xrp_mx:{},
        book_ltc_mx:{},
        book_bch_mx:{}

      };
    }
  componentDidMount(){

  }

  handleChange = (event, index, value) => this.setState({value});
  render() {
    let {book_eth_mx,book_btc_mx,book_xrp_mx,book_ltc_mx,book_bch_mx} = this.props;
    return (

      <div className="background-color">
      <Toolbar className="Toolbar background-color">
        <ToolbarGroup className="ToolbarGroup">
          <img className="bitsoLogo" src={bitsoLogo} alt="bitsoLogo" />
          <ToolbarSeparator className="TickCollection" />
          <div className="ToolbarTitle"> <ToolbarTitle text="BITSO FROND END CHALLENGE" /> </div>
          <TickCollection
            book_btc_mx={book_eth_mx}
            book_eth_mx={book_eth_mx}
            book_xrp_mx={book_xrp_mx}
            book_ltc_mx={book_ltc_mx}
            book_bch_mx={book_bch_mx}
          />
          <ToolbarSeparator className="TickCollection"/>
          <DropDownMenu className="DropDownMenu ToolbarTitle" value={this.state.value} onChange={this.handleChange} openImmediately={false}>
            <MenuItem  value={1} primaryText="EXCHANGE" />
            <MenuItem  value={2} primaryText="TRADING" />
            <MenuItem  value={3} primaryText="RESUMEN" />
            <MenuItem  value={4} primaryText="LIVE TRADES" />
            <MenuItem  value={5} primaryText="POSTURAS" />
          </DropDownMenu>
          <div><FlatButton   label="Ayuda" id="help"/></div>
          <ToolbarSeparator className="TickCollection"/>
            <Avatar
            icon={<FontIcon className="muidocs-icon-communication-voicemail avatarSettings" />}
            size={30}
            />
            <div className="ToolbarTitle"><ToolbarTitle text="Usuario"/>
          </div>

        </ToolbarGroup>
      </Toolbar>
      </div>


    );
  }
}

export default Header;
