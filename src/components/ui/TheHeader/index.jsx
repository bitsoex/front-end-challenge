import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleSidebar } from '../../../store/actions/ui'

import './index.css'
import './animations.css'

import logo from '../../../../Assets/Images/2x/bitso_logo@2x.png'
import mobileLog from '../../../../Assets/Images/1x/bitso.png'

const TheHeader = (props) => (
  <header>
    <div className='logo'>
      <img src={logo} alt='bitso-logo' className='logo is-hidden-mobile' />
      <img src={mobileLog} alt='bitso-logo' className='logo is-hidden-touch' />
    </div>
    <div className='title-page money-exchange'>
      <div>{props.page}</div>
      <div>
        1BTC = {props.exchange.toLocaleString({ style: 'currency', currency: 'MXN' })} MXN
      </div>
    </div>
    <nav>
      <i
        className='material-icons is-hidden-desktop'
        onClick={props.toggleSidebar}
      >
        menu
      </i>
      <ul className={classnames({ show: props.sidebar, hidden: !props.sidebar })}>
        <li>Wallet</li>
        <li>Exchange</li>
        <li>Ayuda</li>
        <li>
          <img alt='user-avatar' />
          {props.user}
        </li>
      </ul>
    </nav>
  </header>
)

const mapStateToProps = ({ ui }) => ({ sidebar: ui.sidebar })

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: bindActionCreators(toggleSidebar, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader)
