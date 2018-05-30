import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import isPlainObject from 'lodash/isPlainObject'

/**
 * This function return new object with the keys in camelCase format
 * @param {Object} obj - Object data
 */
export const camelCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [camelCase(key)]: isPlainObject(child) ? camelCaseObject(child) : child}
}, {})

/**
 * This function return new object with the keys in snakeCase format
 * @param {Object} obj - Object data
 */
export const snakeCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [snakeCase(key)]: isPlainObject(child) ? snakeCaseObject(child) : child}
}, {})

/**
 * This function return a string formated in currency
 * @param {string} str - string to parse and format
 * @param {Object} config - config to local string
 */
export const floatStringToLocaleString = (str, config) => parseFloat(str).toLocaleString(undefined, config)
