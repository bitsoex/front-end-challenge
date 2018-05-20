import React, { Component } from 'react';
import AppHeader from '../../components/header_bar/HeaderBar'

class Layout extends Component {
  render() {
    return (
        <div className="Layout">
            <AppHeader/>
            {this.props.children}
        </div>
    );
  }
}

export default Layout;
