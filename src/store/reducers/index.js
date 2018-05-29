import { combineReducers } from 'redux'

import ui from './ui'
import ticker from './ticker'
import trades from './trades'
import orderBook from './orderBook'
import markets from './markets'
import books from './books'

export default combineReducers({
  ui,
  ticker,
  trades,
  orderBook,
  markets,
  books
})
