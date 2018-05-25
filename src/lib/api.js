const API_URL = 'https://api.bitso.com/v3'

export async function getTickerData () {
  const response = await fetch(`${API_URL}/ticker`)
  if (!response.ok) return Promise.reject(new Error(`Could'nt get ticker information from the server`))
  return response.json()
}
