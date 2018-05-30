import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import routes from '../../router/routes'

/**
 * This component improve the default link router, this link create
 * the route with uri params and query params easy
 * @param {Object|string} to - Options or path to create custom link router
 * @param {strng} [to.name] - Options or path to create custom link router
 * @param {strng} [to.path] - Options or path to create custom link router
 * @param {Object} [to.query] - Options or path to create custom link router
 * @param {Object} [to.params] - Options or path to create custom link router
 */
const Link = ({ to, ...props }) => {
  if (typeof to === 'string') return <RouterLink to={to} {...props} />
  const { name, path, params, query } = to
  let route = name && routes.find(currentRoute => currentRoute.name === name)
    ? routes.find(currentRoute => currentRoute.name === name).path : path

  route = Object.keys(params).reduce((reducer, key) => {
    return reducer.replace(`:${key}`, params[key])
  }, route) + `?${queryString.stringify(query)}`

  return <RouterLink to={route} {...props} />
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
