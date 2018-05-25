import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'

export default combineReducers({
  ui,
  ticker
})
