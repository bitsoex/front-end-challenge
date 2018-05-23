import React, { Component } from 'react'
import {formatCurrency} from '../util/formatNumbers';


const MenuBooks = ({ bookSelected, message  }) => {
	//console.log("Render.MenuBooks", this);
	const units = bookSelected.toUpperCase().split('_')
	return (
		<span href="#about">1 {units[0]} = {formatCurrency(message)} {units[1]}</span>
	);
}
export default MenuBooks