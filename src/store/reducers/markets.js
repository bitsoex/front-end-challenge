import { handleActions } from 'redux-actions'

const initialState = {
  list: []
}

export default handleActions({
  SET_MARKETS_LIST (state, action) {
    return { ...state, list: action.payload }
  },

  CLEAR_MARKETS_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
