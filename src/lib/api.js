import { queryString } from './utils'

const API_URL = 'https://api.bitso.com/v3'

export async function getAvailableBooks (book) {
  const response = await fetch(`${API_URL}/available_books${queryString({ book })}`)
  if (!response.ok) return Promise.reject(new Error(`Could'nt get ticker information from the server`))
  return response.json()
}

export async function getTickerData (book) {
  const response = await fetch(`${API_URL}/ticker${queryString({ book })}`)
  if (!response.ok) return Promise.reject(new Error(`Could'nt get ticker information from the server`))
  return response.json()
}
