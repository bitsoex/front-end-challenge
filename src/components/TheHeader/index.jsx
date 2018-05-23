import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleSidebar as toggleSidebarAction } from '../../store/actions/ui'

import Dropdown from '../ui/Dropdown'

import logo from '../../../Assets/Images/2x/bitso_logo@2x.png'
import mobileLog from '../../../Assets/Images/1x/bitso.png'

import './index.css'
import './animations.css'

const toggleSidebar = (action) => action()

const TheHeader = (props) => (
  <div className='header-container'>
    <header>
      <div className='logo'>
        <img src={logo} alt='bitso-logo' className='logo is-hidden-mobile' />
        <img src={mobileLog} alt='bitso-logo' className='logo is-hidden-desktop' />
      </div>
      <div className='title-page money-exchange'>
        <div>{ props.page }</div>
        <div>
          1BTC = { props.exchange.toLocaleString({ style: 'currency', currency: 'MXN' }) } MXN
        </div>
      </div>
      <nav>
        <i
          className='material-icons is-hidden-tablet'
          onClick={toggleSidebar.bind(null, props.toggleSidebarAction)}
        >
          menu
        </i>
        <ul className={classnames('menu', { show: props.sidebar, hidden: !props.sidebar })}>
          <li><Dropdown options={[{ label: 'option 1' }]} text='Wallet' /></li>
          <li><Dropdown options={[{ label: 'option 2' }]} text='Exchange' /></li>
          <li><Dropdown options={[{ label: 'option 3' }]} text='Ayuda' /></li>
          <li className='user'>
            <img alt='user-avatar' />
            { props.user }
          </li>
        </ul>
      </nav>
    </header>
    <div className='stats'>
      <Dropdown
        className='exchange-type'
        options={[{ label: 'BTC/USD' }]}
        text='BTC/MXN'
      />
      <div className='list'>
        <div className='stat'>
          <span className='label'>Volumen 24hrs</span>
          <span className='value'>170.5405818 BTC</span>
        </div>
        <div className='stat'>
          <span className='label'>Max</span>
          <span className='value'>304,934.23 MXN</span>
        </div>
        <div className='stat'>
          <span className='label'>Min</span>
          <span className='value'>274,934.23 MXN</span>
        </div>
        <div className='stat'>
          <span className='label'>Valoración</span>
          <span className='value'>+4,061.68 MXN (1.4%)</span>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ ui }) => ({ sidebar: ui.sidebar })

const mapDispatchToProps = (dispatch) => ({
  toggleSidebarAction: bindActionCreators(toggleSidebarAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader)
