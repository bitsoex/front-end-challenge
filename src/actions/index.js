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
