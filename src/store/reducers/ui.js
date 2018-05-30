import { handleActions } from 'redux-actions'

const initialState = {
  headerSidebar: false,
  marketsSidebar: false,
  loading: false,
  error: false,
  errorMessage: ''
}

export default handleActions({
  TOGGLE_HEADER_SIDEBAR (state, action) {
    return { ...state, headerSidebar: !state.headerSidebar }
  },

  TOGGLE_MARKETS_SIDEBAR (state, action) {
    return { ...state, marketsSidebar: !state.marketsSidebar }
  },

  SET_LOADING (state, action) {
    return { ...state, loading: action.payload }
  },

  SET_ERROR (state, action) {
    return {
      ...state,
      error: action.payload.value,
      errorMessage: action.payload.message || ''
    }
  }
}, initialState)
