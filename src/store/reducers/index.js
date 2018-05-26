import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'
import trades from './trades'
import orderBook from './orderBook'

export default combineReducers({
  ui,
  ticker,
  trades,
  orderBook
})
