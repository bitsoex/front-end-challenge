import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'
import trades from './trades'
import orderBook from './orderBook'
import markets from './markets'

export default combineReducers({
  ui,
  ticker,
  trades,
  orderBook,
  markets
})
