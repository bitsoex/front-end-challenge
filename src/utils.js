import React from 'react';
import numeral from "numeral";

/**
 * Gray zeros format
 * @param  {number} amount
 * @return {Array}
 */
export const grayzeros = amount => {
	const zeros = /(0)+$/.exec(amount);

	if( zeros ) {
		return [ amount.replace(/(0)+$/, ''), <span class="zerosgray">{zeros[0]}</span> ];
	} else {
		return amount;
	}
};

/**
 * Bar percent amounr
 * @param  {float} amount
 * @param  {float} maxAmount
 */
export const percentAmount = (amount, maxAmount) => {
	let width = (amount / maxAmount) * 100;

	if(width > 100) { width = 100}
	if(width < 5) { width = 5}	

	return <div class="bar" style={{width:`${width}%`}}></div>;
}

export const numberFormat = price => {
	return numeral(price).format("0,0.00[000000]");
}