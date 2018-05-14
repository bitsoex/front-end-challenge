import { createStore } from 'redux'
import appReducer from './'

export default function configureStore(initialState) {
  const store = createStore(appReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./', () => {
      const nextRootReducer = require('./')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
