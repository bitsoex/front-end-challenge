import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'
import trades from './trades'

export default combineReducers({
  ui,
  ticker,
  trades
})
