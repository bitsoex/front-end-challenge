/* global numeral */

export function priceFormat(number) {
  if (number < 1) {
    const value = numeral(number).format('0.00000000');

    if (value === 'NaN') {
      return number;
    }

    return value;
  }

  return numeral(number).format('0,0.00');
}

export function formatNumber(values, number) {
  const value = priceFormat(number);

  if (values.indexOf('mxn') === -1) {
    return value;
  }

  return `$${value}`;
}

export function fixedNumber(value, length) {
  return parseFloat(value || 0).toFixed(length);
}

export function getQuery(params) {
  const query = Object.keys(params)
    .map(key => (
      typeof params[key] !== 'undefined'
        ? `${key}=${params[key]}`
        : undefined
    ))
    .filter(Boolean)
    .join('&');

  return query;
}

export function getJSON(url, params) {
  let query;

  if (params) {
    query = `?${getQuery(params)}`;
  }

  return fetch(`${url}${query || ''}`)
    .then(resp => resp.json());
}

export function average(values, property) {
  return values.reduce((prev, cur) => prev + parseFloat(cur[property]), 0) / values.length;
}
