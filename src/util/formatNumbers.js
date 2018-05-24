import React from 'react';
import PropTypes from 'prop-types';

const FORMAT = 'es-MX';//navigator.language;
const N_FRACTIONS = 2;
//MORE INFO: https://www.currency-iso.org/en/home/tables/table-a1.html
const CURRENCY = 'MXN';

export const formatCurrency = (value, disableCurrencyStyle = false) => {
    if(typeof value == "string")
		value = parseFloat(value)
	else
		if(typeof value != "number")
			value = 0;
	return new Intl.NumberFormat(FORMAT, { 
		style: disableCurrencyStyle ? 'decimal' : 'currency', 
		currency: CURRENCY,
		minimumFractionDigits: N_FRACTIONS
	}).format(value)
	//return value.toLocaleString(FORMAT, { N_FRACTIONS: N_FRACTIONS });
};


export const formatDate = (value)=>{
	
	return new Intl.DateTimeFormat('en-GB', { 
          month: 'long', 
          day: '2-digit' 
    }).format(value)
};