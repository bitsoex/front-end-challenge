import React, { Component, createContext } from "react";
// thanks to https://twitter.com/aweary/status/995496327931822080
import memoize from "memoize-one";
import { fetchAvailableBooks, fetchBookDetails } from "../../api";

export const BookContext = createContext();

export const BookConsumer = BookContext.Consumer;

export class BookProvider extends Component {
  state = {
    book: null,
    bookDetails: null
  };

  availableBooks = [];

  async componentDidMount() {
    const books = await fetchAvailableBooks();
    const book = books[0];
    const bookDetails = await fetchBookDetails(book.book);

    this.availableBooks = books; // this should not change often so no need to put it in the state
    this.setState({ book: books[0], bookDetails });
  }

  changeBook = async book => {
    const bookDetails = await fetchBookDetails(book.book);
    this.setState({ book, bookDetails });
  };

  getContext = memoize((book, bookDetails) => ({
    book,
    bookDetails,
    changeBook: this.changeBook,
    availableBooks: this.availableBooks
  }));

  render() {
    const { book, bookDetails } = this.state;

    if (!book) return <div>Loading...</div>;

    const context = this.getContext(book, bookDetails);

    return (
      <BookContext.Provider value={context}>
        {this.props.children}
      </BookContext.Provider>
    );
  }
}
