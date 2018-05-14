import { handleActions } from 'redux-actions'

const initialState = {
  sidebar: false
}

export default handleActions({
  TOGGLE_SIDEBAR (state, action) {
    return { ...state, sidebar: !state.sidebar }
  }
}, initialState)
