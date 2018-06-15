import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import 'material-design-icons/iconfont/material-icons.css'

import store from '../../store'
import Router from '../../router'

import './index.css'
import './animations.css'
import './fonts.css'

/**
 * This component wrapped the router and the store, after, export it to mount in a DOM.
 * Also import the default styles
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default hot(module)(App)
