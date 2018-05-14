import React from 'react'
import Exchange from '../views/Exchange'

export default [
  {
    exact: true,
    path: '/',
    render: (props) => <Exchange page='exchange' {...props} />
  }
]
