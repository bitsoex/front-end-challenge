import React, { Component } from "react";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";
import theme from "./BooksHeader.module.css";

class BooksHeader extends Component {
  render() {
    const { book, booksList, setBook } = this.props;
    console.log("books", this.props.bookInfo);
    return (
      <div className={theme.header}>
        <Dropdown auto className={theme.inputLabel} theme={theme} onChange={setBook} source={booksList} value={book} />
        <div className={theme.sub}>Max</div>
        <div className={theme.number}>{this.props.bookInfo.maximum_amount}</div>
        <div className={theme.sub}>Min</div>
        <div className={theme.number}>{this.props.bookInfo.minimum_amount}</div>
      </div>
    );
  }
}

export default BooksHeader;
