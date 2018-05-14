const initialState = {
  books: [],
  selectedBook: {}
}

function appReducer(state = initialState, action) {
  switch (action.type) {
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
