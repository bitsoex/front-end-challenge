import * as api from '../../lib/api'
import { camelCaseObject } from '../../lib/utils'

import { DEFAULT_BOOK } from '../../constans'

export const getTickerData = (bookToFilter = '') => async dispatch => {
  const { payload, success } = await api.getTickerData({ book: bookToFilter })
  if (!success) throw new Error(payload.message)
  let book = {}
  if (bookToFilter) {
    book = payload
  } else {
    const data = payload.map(ticker => camelCaseObject(ticker))
    book = data.find(ticker => ticker.book === DEFAULT_BOOK)
    dispatch({ type: 'SET_TICKER_DATA', payload: data })
  }
  dispatch({ type: 'SET_CURRENT_BOOK', payload: book })
  return payload
}

export const getLatestTrades = (bookToFilter = DEFAULT_BOOK) => async dispatch => {
  const { payload, success } = await api.getLatestTrades({ book: bookToFilter })
  if (!success) throw new Error(payload.message)
  const data = payload.map(ticker => camelCaseObject(ticker))
  dispatch({ type: 'SET_LATEST_TRADES', payload: data })
  return payload
}

export const getOrderBook = (bookToFilter = DEFAULT_BOOK) => async dispatch => {
  const { payload, success } = await api.getOrderBook({ book: bookToFilter })
  if (!success) throw new Error(payload.message)
  const data = camelCaseObject(payload)

  const bidsSum = data.bids.reduce((reducer, bid) => (
    parseFloat(bid.amount) + reducer
  ), 0)

  const asksSum = data.asks.reduce((reducer, ask) => (
    parseFloat(ask.amount) + reducer
  ), 0)

  dispatch({
    type: 'SET_ORDER_BOOK_DATA',
    payload: {
      ...data,
      bidsSum,
      asksSum
    }
  })
  return payload
}

export const getMarketsData = ({ limit = 100, sort = 'desc' }) => async dispatch => {
  const { payload: availableBooks, success } = await api.getAvailableBooks()
  if (!success) throw new Error(availableBooks.message)
  const tradesPromises = availableBooks.map(currentBook => api.getLatestTrades({ book: currentBook.book, limit }))

  const responses = await Promise.all(tradesPromises)
  const data = availableBooks.map((book, index) => {
    const data = sort === 'asc' ? responses[index].payload.reverse() : responses[index].payload
    return {
      book: camelCaseObject(book),
      data: data.map(item => camelCaseObject(item))
    }
  })

  dispatch({
    type: 'SET_MARKETS_LIST',
    payload: data
  })
  return data
}

export const getTickerTimeline = (bookToFilter = DEFAULT_BOOK, time = '1month') => async dispatch => {
  const payload = await api.getTickerTimeline(bookToFilter, time)
  const data = payload.map(ticker => camelCaseObject(ticker))
  dispatch({ type: 'SET_TICKER_TIMELINE', payload: data })
  return payload
}
