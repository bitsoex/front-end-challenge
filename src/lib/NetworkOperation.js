import axios from 'axios'

const baseUrl = 'https://api-dev.bitso.com/v3/'

// Request interceptors
axios.interceptors.request.use(
  config => {
    // Add token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // Do something before request is sent
    return config
  },
  error => Promise.reject(error)
)

class NetworkOperation {
  static login(email, password) {
    return axios.post(`${baseUrl}/authenticate`, { email, password })
  }
}

export default NetworkOperation
