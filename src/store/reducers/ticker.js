import { handleActions } from 'redux-actions'

const initialState = {
  data: [],
  timeline: [],
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

  SET_TICKER_TIMELINE (state, action) {
    return { ...state, timeline: action.payload }
  },

  CLEAR_TICKER_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
