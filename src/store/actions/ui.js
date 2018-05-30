import { createAction } from 'redux-actions'

export const toggleSidebar = createAction('TOGGLE_HEADER_SIDEBAR')
export const toggleMarkets = createAction('TOGGLE_MARKETS_SIDEBAR')
export const setLoading = createAction('SET_LOADING')
export const setError = createAction('SET_ERROR')
