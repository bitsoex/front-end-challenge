import React, { Fragment } from 'react'

/**
 * Function that creates the trade suscribe message
 * @param {String} [book='btc_mxn'] Default book
 */
export const tradeSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'transactions'
  })

/**
 * Function that creates the DIFF orders suscribe message
 * @param {String} [book='btc_mxn'] Default book
 */
export const DIFF_ordersSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'diff-orders'
  })

/**
 * Function that creates the orders suscribe message
 * @param {String} [book='btc_mxn'] Default book
 */
export const ordersSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'orders'
  })

/**
 * Available periods to use in the chart
 * @type {Array}
 */
export const PERIODS = [
  {
    title: '1m',
    value: '1month'
  },
  {
    title: '3m',
    value: '3months'
  },
  {
    title: '1y',
    value: '1year'
  }
]

/**
 * Available intervals to use in the chart
 * @type {Array}
 */
export const INTERVALS = [
  {
    title: '1d',
    value: '1D'
  },
  {
    title: '1s',
    value: '1W'
  },
  {
    title: '1m',
    value: '1M'
  },
  {
    title: '3m',
    value: '3M'
  }
]

/**
 * Function to extract the datapoints to be used in the charts
 * @param  {[type]} data Data containing the needed ponints
 * @return {[type]}      Datapoints
 */
export function extractDataPoints(data) {
  return data.map(({ date, open, high, low, close }) => [
    new Date(date).getTime(),
    parseFloat(open),
    parseFloat(high),
    parseFloat(low),
    parseFloat(close)
  ])
}

/**
 * Function to return a string with thousands separator
 * @param  {Number} n [description]
 * @return {Number}   [description]
 */
function thusandsSeparator(n) {
  let number = String(n)
  while (true) {
    const n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
    if (number === n2) break
    number = n2
  }
  return number
}

/**
 * Function to create a react componetn with highlighted meaningful numbers
 * @param  {Number} value       The number to be transformed
 * @param  {Number} [toFixed=8] Number of decimals
 * @return {React.Component}             React component
 */
export function toFixed(value, toFixed = 8) {
  const number = parseFloat(Math.round(value * 10000) / 10000).toFixed(toFixed)
  let stringNumber = String(number)

  if (toFixed === 2) {
    return thusandsSeparator(number)
  }

  stringNumber = stringNumber.split('').reverse()
  let highlighted = []
  let normal = []
  let foundNumber = false
  for (const letter of stringNumber) {
    if (letter === '0' && !foundNumber) {
      normal.unshift(letter)
    } else {
      foundNumber = true
      highlighted.unshift(letter)
    }
  }

  highlighted = highlighted.join('')
  normal = normal.join('')

  // return number
  return (
    <Fragment>
      <span>{highlighted}</span>
      {normal}
    </Fragment>
  )
}
