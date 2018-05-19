export function setBooks(books) {
  return {
    type: 'SET_BOOKS',
    books
  }
}

export function setSelectedBook(book) {
  return {
    type: 'SET_SELECTED_BOOK',
    book
  }
}

export function setTransactions(transactions) {
  return {
    type: 'SET_TRANSACTIONS',
    transactions
  }
}

export function setOrders(orders) {
  return {
    type: 'SET_ORDERS',
    orders
  }
}

export function setChartData(data) {
  return {
    type: 'SET_CHART_DATA',
    data
  }
}
