import axios from 'axios'

const baseUrl = 'https://api.bitso.com/v3'

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
    return axios.get(`${baseUrl}/available_books`)
  }

  static getChartData({ book, period }) {
    return axios.get(`https://bitso.com/trade/chartJSON/${book}/${period}`)
  }
}

export default NetworkOperation
