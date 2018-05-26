import * as api from '../../lib/api'
import { camelCaseObject } from '../../lib/utils'

const defaultBook = 'btc_mxn'

export const getTickerData = (bookToFilter = '') => async dispatch => {
  const { payload } = await api.getTickerData(bookToFilter)
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
