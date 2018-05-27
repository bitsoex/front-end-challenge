import { queryString } from './utils'
import { DEFAULT_BOOK } from './../constans'

const API_URL = 'https://api.bitso.com/v3'
const API_TESTS_URL = 'https://bitso.com'

export async function getAvailableBooks () {
  const response = await fetch(`${API_URL}/available_books`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get available books from the server`))
  return response.json()
}

export async function getTickerData (query) {
  const response = await fetch(`${API_URL}/ticker${queryString(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get ticker information from the server`))
  return response.json()
}

export async function getLatestTrades (query) {
  const response = await fetch(`${API_URL}/trades${queryString(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get trades information from the server`))
  return response.json()
}

export async function getOrderBook (query) {
  const response = await fetch(`${API_URL}/order_book${queryString(query)}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get order book information from the server`))
  return response.json()
}

export async function getTickerTimeline (book = DEFAULT_BOOK, time = '1month') {
  const response = await fetch(`${API_TESTS_URL}/trade/chartJSON/${book}/${time}`)
  if (!response.ok) return Promise.reject(new Error(`Couldn't get ticker timeline information from the server`))
  return response.json()
}
