import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import App from 'containers/App'

// Redux store
import configStore from 'reducers/configStore'
const store = configStore()

function Routes() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* <Route exact path="/login" component={Login}/> */}
          <Route component={App} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default hot(module)(Routes)
