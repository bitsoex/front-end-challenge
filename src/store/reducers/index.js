import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'
import exchange from './exchange'

export default combineReducers({
  ui,
  ticker,
  exchange
})
