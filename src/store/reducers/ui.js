import { handleActions } from 'redux-actions'

const initialState = {
  headerSidebar: false
}

export default handleActions({
  TOGGLE_HEADER_SIDEBAR (state, action) {
    return { ...state, headerSidebar: !state.headerSidebar }
  }
}, initialState)
