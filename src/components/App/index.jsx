import React, { Component } from 'react'
import { Provider } from 'react-redux'

import 'material-design-icons/iconfont/material-icons.css'

import store from '../../store'
import Router from '../../router'
import './index.css'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
