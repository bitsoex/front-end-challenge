const initialState = {
  books: [],
  selectedBook: {}
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.books,
        selectedBook: action.books[0]
      }
    case 'SET_SELECTED_BOOK':
      return {
        ...state,
        selectedBook: action.book
      }
    default:
      return state
  }
}

export default appReducer
