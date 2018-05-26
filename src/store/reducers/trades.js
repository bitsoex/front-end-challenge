import { handleActions } from 'redux-actions'

const initialState = {
  latest: []
}

export default handleActions({
  SET_LATEST_TRADES (state, action) {
    return { ...state, latest: action.payload }
  },

  CLEAR_TRADES_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
