import { handleActions } from 'redux-actions'

const initialState = {
  data: []
}

export default handleActions({
  SET_TICKER_DATA (state, action) {
    return { ...state, data: action.payload }
  },

  CLEAR_TICKER_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
