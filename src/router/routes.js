import React from 'react'
import Exchange from '../views/Exchange'

export default [
  {
    type: 'redirect',
    exact: true,
    from: '/',
    to: '/exchange'
  },
  {
    exact: true,
    path: '/exchange/:type',
    render: (props) => <Exchange page='exchange' {...props} />
  },
  {
    exact: false,
    path: '/exchange',
    render: (props) => <Exchange page='exchange' {...props} />
  }
]
