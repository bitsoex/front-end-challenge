import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import routes from './routes'

/**
 * This component provides the availables routes to navigate in
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      {
        routes.map((route, index) => route.type === 'redirect'
          ? <Redirect key={route.path || index} {...route} />
          : <Route key={route.path || index} {...route} />
        )
      }
    </Switch>
  </BrowserRouter>
)

export default Router
