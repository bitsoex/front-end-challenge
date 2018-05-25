import React from 'react'
import { Provider } from 'react-redux'
import FilterLabelBook from '../containers/FilterLabelBook'
import DropDown from './dropdown/DropDown'

import bitsoLogo from '../assets/images/1x/bitso_logo.png'
import bitsoLogoOriginal from '../assets/images/1x/bitso_logo_orignal.png'

import collapseImg from '../assets/images/1x/icon_dropdown.png'
import burguerImg from '../assets/images/SVG/menu_burguer.svg'

class Header extends React.Component {
	
	render(){
		const { toggleCheckboxChange, isChecked, store } = this.props;
		return(
			<ul>
				<li className="vcenter logo"><img src={isChecked ? bitsoLogo : bitsoLogoOriginal} /></li>
				<li className="vcenter separator"><span>|</span></li>
				<li className="vcenter title"><span>EXCHANGE</span></li>
				
				<li className="vcenter floatRight burguer">
					<img src={burguerImg} />
				</li>
				<li className="vcenter floatRight togglelight">
					<label className="switch">
						<input type="checkbox" onChange={toggleCheckboxChange} checked={isChecked} />
						<span className="slidericons round"></span>
						<span className="slider round"></span>
					</label>
				</li>
				<li className="vcenter floatRight usermenu">
					<span>Usuario<img src={collapseImg} /></span>
				</li>
				<li className="vcenter floatRight userimage">
					<div className="user">
						<div className="inner">
						</div>
					</div>
				</li>
				<li className="vcenter floatRight exchange">
					<span>Exchange<img src={collapseImg} /></span>
					</li>
				<li className="vcenter floatRight wallet">
					<span>Wallet<img src={collapseImg} /></span>
				</li>
				<li className="vcenter floatRight separator"><span>|</span></li>
				<li className="vcenter floatRight exchangevalue">
					<Provider store={store}>
						<FilterLabelBook />
					</Provider>
				</li>
			</ul>
		);
	}
	
}

export default Header