import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import BitsoLogo from '../../assets/images/SVG/bitso_logo.svg'

class HeaderBar extends Component {
    render() {
        return (
            <div className="HeaderBar">
                <AppBar >
                    <img height='50%' style={{paddingRight:'10px',borderRight:'1px solid #FFFF',height:'50%'}} src={BitsoLogo}/>
                    <span> EXCHANGE </span>
                    <Navigation height='10' type='horizontal'>
                        <Link href='http://' label='Inbox' icon='inbox' />
                        <Link href='http://' active label='Profile' icon='person' />
                    </Navigation>
                </AppBar>
            </div>
        );
    }
}

export default HeaderBar;
