import { handleActions } from 'redux-actions'

const initialState = {
  headerSidebar: false,
  marketsSidebar: false
}

export default handleActions({
  TOGGLE_HEADER_SIDEBAR (state, action) {
    return { ...state, headerSidebar: !state.headerSidebar }
  },
  TOGGLE_MARKETS_SIDEBAR (state, action) {
    return { ...state, marketsSidebar: !state.marketsSidebar }
  }
}, initialState)
