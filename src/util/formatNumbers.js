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
	
	let numberFixed = number.toFixed(config.decimalNumberSizeString);
	let numberParts = numberFixed.split(".");
	
	if(numberFixed.length <= numberString.length)
		return {
			numbers: numberFixed ,
			zeros: ""
		}
	
	let numberStringParts = numberString.split(".")
	let sizeDecilamNumber = numberStringParts[1] ? numberStringParts[1].length : 0;
	const zeros = numberParts[1].slice(sizeDecilamNumber , config.decimalNumberSizeString);
	return {
		numbers: numberParts[0] + "." + numberParts[1].slice(0 , sizeDecilamNumber) ,
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
		const formatedValue = formatNumber(value);
		return formatedValue.numbers + formatedValue.zeros + (disableCurrencyStyle ? "" : " " + currencyRequest);
	}
	
	return new Intl.NumberFormat(FORMAT, { 
		style: disableCurrencyStyle ? 'decimal' : 'currency', 
		currency: currencyRequest,
		minimumFractionDigits: config.fractionDigits
	}).format(value) + (disableCurrencyStyle ? "" : " " + currencyRequest);
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