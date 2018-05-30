import React, { Component } from 'react';

/**
 * Header principal
 */
class NavbarMain extends Component {
	render() {
		return <nav class="navbar header-nav fixed-top">
			<div class="logo">
				<a class="navbar-brand" href="#">
	    			<img src="/images/svg/bitso_logo.svg" width="110" height="36" alt=""/>
	  			</a>
	  			<div class="exchange">Exchange</div>
  			</div>
  			<div class="currentvalue">1 BTC = 000,000 MXN</div>
  			<div class="infouser">
  				<ul>
  					<li>Wallet <img class="icon_dropdown" src="/images/svg/icon_dropdown.svg" width="10"/></li>
  					<li>Exchange <img class="icon_dropdown" src="/images/svg/icon_dropdown.svg" width="10"/></li>
  					<li>Ayuda</li>
  					<li class="usuario"><div class="image-profile"><div></div></div>Usuario <img class="icon_dropdown" src="/images/svg/icon_dropdown.svg" width="10"/></li>
  					<li></li>
  				</ul>
  			</div>
		</nav>;
	}
}

export default NavbarMain;