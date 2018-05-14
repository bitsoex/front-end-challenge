export const tradeSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'transactions'
  })
export const DIFF_ordersSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'diff-orders'
  })
export const ordersSuscribe = (book = 'btc_mxn') =>
  JSON.stringify({
    action: 'subscribe',
    book,
    type: 'orders'
  })
