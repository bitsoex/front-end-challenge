import * as api from '../../lib/api'
import { camelCaseObject } from '../../lib/utils'

import { DEFAULT_BOOK as defaultBook } from '../../constans'

export const getTickerData = (bookToFilter = '') => async dispatch => {
  const { payload } = await api.getTickerData({ book: bookToFilter })
  let book = {}
  if (bookToFilter) {
    book = payload
  } else {
    const data = payload.map(ticker => camelCaseObject(ticker))
    book = data.find(ticker => ticker.book === defaultBook)
    dispatch({ type: 'SET_TICKER_DATA', payload: data })
  }
  dispatch({ type: 'SET_CURRENT_BOOK', payload: book })
  return payload
}

export const getLatestTrades = (bookToFilter = defaultBook) => async dispatch => {
  const { payload } = await api.getLatestTrades({ book: bookToFilter })
  const data = payload.map(ticker => camelCaseObject(ticker))
  dispatch({ type: 'SET_LATEST_TRADES', payload: data })
  return payload
}
