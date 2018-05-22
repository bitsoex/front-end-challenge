import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import BitsoLogo from '../../assets/images/SVG/bitso_logo.svg'
import IconMenu from 'react-toolbox/lib/menu/Menu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
// import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import styles from './HeaderBar.module.css';

class HeaderBar extends Component {
    state = {
        dark: true
    };

    handleChange = (field, value) => {
        this.setState({ ...this.state, [field]: value });
    };
    render() {
        return (
            <div className='HeaderBar'>
            <IconMenu icon='more_vert' position='topLeft' menuRipple>
                            <MenuItem value='download' icon='get_app' caption='Download' />
                            <MenuItem value='help' icon='favorite' caption='Favorite' />
                        </IconMenu>
                <AppBar>
                    <img className={styles.logo} src={BitsoLogo} alt={'Bitso Logo'}/>
                    <span className={styles['separator-sm']} />
                    <span className={styles.title}> EXCHANGE </span>
                    <Navigation className={styles.nav} type='horizontal'>
                        
                        <Link href='http://' label='Inbox' icon='inbox' />
                        <Link href='http://' active label='Profile' icon='person' />
                    </Navigation>
                </AppBar>
            </div>
        );
    }
}

export default HeaderBar;
