import { handleActions } from 'redux-actions'

const initialState = {
  list: []
}

export default handleActions({
  SET_BOOKS_LIST (state, action) {
    return { ...state, list: action.payload }
  },

  CLEAR_BOOKS_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
