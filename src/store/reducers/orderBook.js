import { handleActions } from 'redux-actions'

const initialState = {
  updatedAt: '',
  bids: [],
  asks: [],
  sequence: ''
}

export default handleActions({
  SET_ORDER_BOOK_DATA (state, action) {
    return { ...state, ...action.payload }
  },

  CLEAR_ORDER_BOOK_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
