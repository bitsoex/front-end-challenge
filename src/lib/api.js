import queryString from 'query-string'

import { DEFAULT_BOOK } from './../constans'

const API_URL = 'https://api.bitso.com/v3'
const API_TESTS_URL = 'https://bitso.com'

/**
 * Get available books from the bitso api
 */
export async function getAvailableBooks () {
  const response = await fetch(`${API_URL}/available_books`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get available books from the server`))
  return response.json()
}

/**
 * This endpoint returns trading information from the specified book.
 * @param {Object} query - The params to filter elements in api
 * @param {string} [query.book] - Order book symbol Major_Minor
 * @param {string} [query.volume] - Last 24 hours volume Major
 * @param {string} [query.high] - Last 24 hours price high Minor/Major
 * @param {string} [query.last] - Last traded price Minor/Major
 * @param {string} [query.low] - Last 24 hours price low Minor/Major
 * @param {string} [query.vwap] - Last 24 hours volume weighted average price: vwap Minor/Major
 * @param {string} [query.ask] - Lowest sell order Minor/Major
 * @param {string} [query.bid] - Highest buy order Minor/Major
 * @param {string} [query.created_at] - Timestamp at which the ticker was generated ISO 8601 timestamp
 */
export async function getTickerData (query) {
  const response = await fetch(`${API_URL}/ticker?${queryString.stringify(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get ticker information from the server`))
  return response.json()
}

/**
 * This endpoint returns a list of all open orders in the specified book.
 * If the aggregate parameter is set to true, orders will be aggregated by price,
 * and the response will only include the top 50 orders for each side of the book.
 * If the aggregate parameter is set to false, the response will include the full order book.
 * @param {Object} query - The params to filter elements in api
 * @param {!string} query.book - Specifies which book to use
 * @param {boolean} [query.aggregate = false] - Specifies if orders should be aggregated by price.
 */
export async function getOrderBook (query) {
  const response = await fetch(`${API_URL}/order_book?${queryString.stringify(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get order book information from the server`))
  return response.json()
}

/**
 * This endpoint returns a list of recent trades from the specified book.
 * @param {Object} query - The params to filter elements in api
 * @param {string} [query.book] - Specifies which book to use
 * @param {number} [query.marker] - Returns objects that are older or newer (depending on 'sort’) than the object with this ID
 * @param {string} [query.sort=desc] - No Specifies ordering direction of returned objects ('asc’, 'desc’)
 * @param {number} [query.limit=25] - No Specifies number of objects to return. (Max is 100)
 */
export async function getLatestTrades (query) {
  const response = await fetch(`${API_URL}/trades?${queryString.stringify(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get trades information from the server`))
  return response.json()
}

/**
 * This endpoint returns a data for the candlestick chart
 * @param {string} book - Specifies which book to use
 * @param {string} time - Specifies time to filter, possible values: 1month, 3month, 1year
 */
export async function getTickerTimeline (book = DEFAULT_BOOK, time = '1month') {
  const response = await fetch(`${API_TESTS_URL}/trade/chartJSON/${book}/${time}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get ticker timeline information from the server`))
  return response.json()
}
