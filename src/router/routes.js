import React from 'react'
import Exchange from '../views/Exchange'

export default [
  {
    type: 'redirect',
    name: 'home',
    exact: true,
    from: '/',
    to: '/exchange'
  },
  {
    exact: true,
    type: 'redirect',
    from: '/exchange',
    to: '/exchange/btc-mxn'
  },
  {
    exact: true,
    path: '/exchange/:type',
    name: 'exchange',
    render: (props) => <Exchange page='exchange' {...props} />
  }
]
