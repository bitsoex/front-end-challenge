import { handleActions } from 'redux-actions'

const initialState = {
  list: [],
  loading: false,
  error: false,
  errorMessage: ''
}

export default handleActions({
  SET_MARKETS_LIST (state, action) {
    return { ...state, list: action.payload }
  },

  SET_MARKETS_LOADING (state, action) {
    return { ...state, loading: action.payload }
  },

  SET_MARKETS_ERROR (state, action) {
    return {
      ...state,
      error: action.payload.value,
      errorMessage: action.payload.message
    }
  },

  CLEAR_MARKETS_DATA (state, action) {
    return { ...initialState }
  }
}, initialState)
