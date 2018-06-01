import React, {Component} from 'react'
import '../Statics/css/Header.css'
import {MdMenu} from 'react-icons/lib/md'

export default class Header extends Component {
    render(){
        return(
            <div className='Header' >
                <MdMenu className='menuIcon' />
                <h2 class='logo' >Menu</h2>
            </div>
        )
    }
}
