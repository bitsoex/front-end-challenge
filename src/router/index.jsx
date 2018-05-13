import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import routes from './routes'

const Router = () => (
  <BrowserRouter>
    <Switch>
      {
        routes.map(route => route.type === 'redirect'
          ? <Redirect key={route.path} {...route} />
          : <Route key={route.path} {...route} />
        )
      }
    </Switch>
  </BrowserRouter>
)

export default Router
