import React, { Component } from 'react'
import {formatCurrency} from '../util/formatNumbers';

const LabelBook = ({ bookSelected, exchange  }) => {
	console.log("Render.MenuBooks", bookSelected, exchange);
	const units = bookSelected.toUpperCase().split('_')
	return (
		<span>1 {units[0]} = {formatCurrency(exchange, units[1])}</span>
	);
}
export default LabelBook