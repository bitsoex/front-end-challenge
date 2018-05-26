import { queryString } from './utils'

const API_URL = 'https://api.bitso.com/v3'

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
