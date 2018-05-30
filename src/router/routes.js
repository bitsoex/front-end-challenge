import React from 'react'
import kebabCase from 'lodash/kebabCase'

import Exchange from '../views/Exchange'
import { DEFAULT_BOOK } from '../constans'

export default [
  // Here redirect the home path to exchange path
  {
    type: 'redirect',
    name: 'home',
    exact: true,
    from: '/',
    to: '/exchange'
  },
  // Here redirect the empty exchange path to path with default param
  {
    exact: true,
    type: 'redirect',
    from: '/exchange',
    to: `/exchange/${kebabCase(DEFAULT_BOOK)}` // The argument must be in kebabCase
  },
  {
    exact: true,
    path: '/exchange/:book([a-z]{3}-[a-z]{3})', // The exchange must be in kebabCase and have 3 chars in the two strings
    name: 'exchange',
    render: (props) => <Exchange page='exchange' {...props} />
  }
]
