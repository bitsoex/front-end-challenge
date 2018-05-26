import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  current: {
    book: '',
    volume: '',
    high: '',
    last: '',
    createdAt: '',
    vwap: '',
    low: '',
    ask: '',
    bid: ''
  }
}

export default handleActions({
  SET_TICKER_DATA (state, action) {
    return { ...state, data: action.payload }
  },

  SET_CURRENT_BOOK (state, action) {
    return { ...state, current: action.payload }
  },

  CLEAR_TICKER_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
