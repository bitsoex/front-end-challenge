import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import routes from '../../router/routes'

const CLEAN_REGEX_POSITION = 0

/**
 * This component improve the default link router, this link create
 * the route with uri params and query params easy
 * @param {Object} props - React props
 * @param {Object|string} props.to - Options or path to create custom link router
 * @param {strng} [props.to.name] - Options or path to create custom link router
 * @param {strng} [props.to.path] - Options or path to create custom link router
 * @param {Object} [props.to.query] - Options or path to create custom link router
 * @param {Object} [props.to.params] - Options or path to create custom link router
 */
const Link = (props) => {
  const { to, label, ...restProps } = props
  if (typeof to === 'string') return <RouterLink to={to} {...restProps} />
  const { name, path, params, query } = to
  let route = name && routes.find(currentRoute => currentRoute.name === name)
    ? routes.find(currentRoute => currentRoute.name === name).path : path

  route = route.split('(')[CLEAN_REGEX_POSITION]
  route = Object.keys(params).reduce((reducer, key) => {
    return reducer.replace(`:${key}`, params[key])
  }, route) + `?${queryString.stringify(query)}`

  return <RouterLink to={route} {...restProps}>{label}</RouterLink>
}

Link.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      params: PropTypes.object,
      query: PropTypes.object,
      path: PropTypes.string
    })
  ]).isRequired,
  params: PropTypes.object,
  query: PropTypes.object
}

Link.defaultProps = {
  to: { path: '/', params: {}, query: {} }
}

export default Link
