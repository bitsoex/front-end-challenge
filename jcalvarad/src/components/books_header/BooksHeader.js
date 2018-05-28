import React, { Component } from "react";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";
import theme from "./BooksHeader.module.css";

class BooksHeader extends Component {
  render() {
    const { book, booksList, setBook } = this.props;
    console.log("books", this.props.bookInfo);
    return (
      <div className={theme.header}>
        <span className={theme.books}>
          <Dropdown auto className={theme.inputLabel} theme={theme} onChange={setBook} source={booksList} value={book} />
        </span>
        <span className={theme.sub}>Max.</span>
        <span className={theme.number}>{this.props.bookInfo.maximum_price}</span>
        <span className={theme.sub}>Min.</span>
        <span className={theme.number}>{this.props.bookInfo.minimum_price}</span>
      </div>
    );
  }
}

export default BooksHeader;
