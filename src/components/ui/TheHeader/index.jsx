import React from 'react'

import './index.css'

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
      <i className='material-icons is-hidden-desktop'>menu</i>
      <ul className='show'>
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

export default TheHeader
