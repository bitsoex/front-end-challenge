import axios from 'axios'

const baseUrl = 'https://api-dev.bitso.com/v3'

class NetworkOperation {
  static getTicker() {
    return axios.get(`${baseUrl}/ticker`, {
      params: {}
    })
  }

  static getTrades({ book, limit = 30 }) {
    return axios.get(`${baseUrl}/trades?book=${book}&limit=${limit}`)
  }

  static getAvailableBooks() {
    return axios.get('https://api.bitso.com/v3/available_books')
  }
}

export default NetworkOperation
