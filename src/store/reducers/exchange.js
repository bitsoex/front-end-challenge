import { handleActions } from 'redux-actions'

const initialState = {
  books: [],
  book: {}
}

export default handleActions({
  SET_BOOKS (state, action) {
    return { ...state, books: action.payload }
  },

  SET_CURRENT_BOOK (state, action) {
    return { ...state, book: action.payload }
  },

  CLEAR_TICKER_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
