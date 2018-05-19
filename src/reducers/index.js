// import { fromJS } from 'immutable'

const initialState = {
  books: [],
  selectedBook: {},
  transactions: [],
  orders: {
    bids: [],
    asks: []
  },
  orderAsks: [],
  chartData: []
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CHART_DATA':
      return {
        ...state,
        chartData: action.data
      }
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions
      }
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.orders
      }
    case 'SET_BOOKS': {
      const selectedBook = action.books[0]
      return {
        ...state,
        books: action.books,
        selectedBook: {
          ...selectedBook,
          from: selectedBook.book.split('_')[0].toUpperCase(),
          to: selectedBook.book.split('_')[1].toUpperCase()
        }
      }
    }
    case 'SET_SELECTED_BOOK': {
      return {
        ...state,
        selectedBook: {
          ...action.book,
          from: action.book.book.split('_')[0].toUpperCase(),
          to: action.book.book.split('_')[1].toUpperCase()
        }
      }
    }
    default:
      return state
  }
}

export default appReducer
