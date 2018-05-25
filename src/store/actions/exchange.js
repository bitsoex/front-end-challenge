import * as api from '../../lib/api'

export const getTickerData = () => async dispatch => {
  let { payload } = await api.getTickerData()
  dispatch({ type: 'SET_TICKER_DATA', payload })
  return payload
}
