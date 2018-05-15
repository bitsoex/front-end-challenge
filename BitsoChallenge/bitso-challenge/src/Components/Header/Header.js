import React, { Component } from 'react';
import logo from './../../Assets/Images/SVG/bitso_logo.svg'
import CoinSection from './CoinSection/CoinSection';
import SelectCoin from './SelectCoin/SelectCoin';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      changeAmount:0,
      activeCoin:this.props.activeCoin,
      ticketInfo:this.props.ticketInfo
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps!==this.props){
        this.setState({ticketInfo:nextProps.ticketInfo, activeCoin:nextProps.activeCoin})
    }
}

changeBook(){
  console.log('Change2')
  this.props.changeBook();
}



  render() {
    return (
      <section className='header-principal'>
      <section className="header-section">
        <section className="header">
          <img className="logo" src={logo} alt="logo" />
          <p className="header-title">|</p>
          <p className="header-title">EXCHANGE</p>
        </section>
       
        <CoinSection ticketInfo={this.state.ticketInfo} activeCoin={this.state.activeCoin}/>
        

      </section>
      <SelectCoin changeBook={this.props.changeBook} ticketInfo={this.state.ticketInfo}  activeCoin={this.state.activeCoin}/> 
      </section>
    );
  }
}

export default Header;
