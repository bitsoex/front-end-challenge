import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Reducers'
import './Statics/css/index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Routes/Home'
import Test from './Routes/Test'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <BrowserRouter>
        <div className='App' >
            <Route exact path='/' component={Home} />
            <Route exact path='/test' component={Test} />
        </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
