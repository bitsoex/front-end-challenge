import React from 'react';
import PropTypes from 'prop-types'
import config from '../config'

const FORMAT = 'es-MX';//navigator.language;
const CURRENCY_DEFAULT = 'MXN';

/**
 * Given a decimal number, return a object two parts
 * - A {string} with only numbers
 * - A {string} with only zeros truncate to a size, default 8
 *
 * @param {number/string} value The value to format.
 * @param {boolean} disableCurrencyStyle Optionally can disable the Unit. 
 * @return {Object} The format of a number Ex. 3.55 =>   {numbers:"3.55", zeros: "000000"}
 */
export const formatNumber = (value) => {
	const number =  parseFloat(value);
	let numberString = number.toString();
	if(numberString.length > config.dicimalNumberSizeString )
		numberString = numberString.substring(0, config.dicimalNumberSizeString);
	const numberWithZeros = number.toFixed(config.dicimalNumberSizeString);
	const zeros = numberWithZeros.slice(numberString.length);
	return {
		numbers: number,
		zeros: zeros
	}
}

/**
 * Given a number value, return a new currency text format
 * 
 * @param {number} value The value to transform.
 * @param {string} currency The currency to transform. Default MXN.
 * @param {boolean} disableCurrencyStyle Optionally can disable the Unit. 
 * @return {string} The format value Ex. 1000 => 1,000,000 MXN
 */

export const formatCurrency = ( value, currency = CURRENCY_DEFAULT, disableCurrencyStyle = false) => {
	const currencyRequest = currency.toUpperCase();
    if(typeof value == "string")
		value = parseFloat(value)
	else
		if(typeof value != "number")
			value = 0;
	
	if(currencyRequest != "MXN"){
		return formatNumber(value).numbers + (disableCurrencyStyle ? "" : " " + currencyRequest);
	}
	
	return new Intl.NumberFormat(FORMAT, { 
		style: disableCurrencyStyle ? 'decimal' : 'currency', 
		currency: currencyRequest,
		minimumFractionDigits: config.fractionDigits
	}).format(value)
	//return value.toLocaleString(FORMAT, { N_FRACTIONS: N_FRACTIONS });
};

/**
 * Given a date value, return a new currency text format
 * 
 * @param {Date} value The value to transform. 
 * @return {string} The format value Ex. 10 April
 */
export const formatDate = (value)=>{
	
	return new Intl.DateTimeFormat( FORMAT, { 
          month: 'long', 
          day: '2-digit' 
    }).format(value)
};