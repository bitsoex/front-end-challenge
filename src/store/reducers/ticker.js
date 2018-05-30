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
    ask: 0,
    bid: 0
  },
  loading: false,
  error: false,
  errorMessage: ''
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

  SET_TICKER_LOADING (state, action) {
    return { ...state, loading: action.payload }
  },

  SET_TICKER_ERROR (state, action) {
    return {
      ...state,
      error: action.payload.value,
      errorMessage: action.payload.message || ''
    }
  },

  CLEAR_TICKER_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
