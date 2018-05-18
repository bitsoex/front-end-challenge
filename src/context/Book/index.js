import React, { Component, createContext } from "react";
// thanks to https://twitter.com/aweary/status/995496327931822080
import memoize from "memoize-one";
import { availableBooks } from "../../api";

export const BookContext = createContext();

export const BookConsumer = BookContext.Consumer;

export class BookProvider extends Component {
  state = { book: null };

  books = [];

  async componentDidMount() {
    const books = await availableBooks();
    this.books = books;
    this.setState({ book: books[0] });
  }

  changeBook = book => this.setState({ book });

  getContext = memoize(book => ({
    book,
    books: this.books,
    changeBook: this.changeBook
  }));

  render() {
    console.log("render book provider");
    const { book } = this.state;

    if (!book) return null;

    const context = this.getContext(book);

    return (
      <BookContext.Provider value={context}>
        {this.props.children}
      </BookContext.Provider>
    );
  }
}
