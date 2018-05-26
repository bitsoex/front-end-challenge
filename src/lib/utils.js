import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import isPlainObject from 'lodash/isPlainObject'

const EMPTY_ARRAY = 0

export const camelCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [camelCase(key)]: isPlainObject(child) ? camelCaseObject(child) : child}
}, {})

export const snakeCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return {...reduce, [snakeCase(key)]: isPlainObject(child) ? snakeCaseObject(child) : child}
}, {})

export const floatStringToLocaleString = (str, config) => parseFloat(str).toLocaleString(undefined, config)

export const queryString = (obj = {}) => {
  const keys = Object.keys(obj)
  if (keys.length === EMPTY_ARRAY) return ''
  const queryParams = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  return '?' + queryParams.join('&')
}
