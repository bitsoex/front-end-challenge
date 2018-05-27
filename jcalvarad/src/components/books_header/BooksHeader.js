import React, { Component } from "react";
import Dropdown from "react-toolbox/lib/dropdown/Dropdown";
import theme from "./BooksHeader.module.css";

class BooksHeader extends Component {
  render() {
    const { book, booksList, setBook } = this.props;

    return (
      <div className={theme.header}>
        <Dropdown auto className={theme.inputLabel} theme={theme} onChange={setBook} source={booksList} value={book} />
      </div>
    );
  }
}

export default BooksHeader;
