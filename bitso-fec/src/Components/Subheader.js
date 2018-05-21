import React, { Component } from "react";
import axios from "axios";
import numeral from "numeral";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import Loading from "./Loading";
import { formatNumber } from "../Utils";

/**
 * Trades table component for recent trades from the specified book.
 * @param {Array<String>} round Ceros to round out number for price and value
 * @param {Array<Object>} orders first orders and diff-orders parsed
 * @param {string} book Active book
 * @param {string} type Specifies the style of the table
 * @param {number} biggestAmount Get biggest amount for the orders
 * @param {number} width Get percentage depending on biggestAmount and amount for each order
 * @param {number} integer Number to be lighted
 * @param {Array<String>} coin Divide book to style the coins of the book
 */

class Subheader extends Component {
  state = {
    availableBooks: null,
    ticker: null,
    loading: true
  };
  /**
   * Get the actual data ticker of the specified book
   * @returns {Number} The current value of the tag.
   */
  handleTicker = async book => {
    const ticker = await axios.get(
      `https://api.bitso.com/v3/ticker/?book=${book}`
    );
    return ticker.data.payload;
  };

  async componentDidMount() {
    const books = await axios.get("https://api.bitso.com/v3/available_books/");
    const ticker = await this.handleTicker(this.props.book);
    this.setState({
      availableBooks: books.data.payload,
      ticker,
      book: this.props.book,
      loading: false
    });
  }

  render() {
    const { onSelectBook, book } = this.props;
    const { loading, availableBooks, ticker } = this.state;
    if (loading) return <Loading rows={1} />;
    const coin = book.split("_");
    return (
      <div className="subheader-container">
        <Menu mode="horizontal" onSelect={book => onSelectBook(book.key)}>
          <SubMenu
            className="subheader_menu-item"
            key="available__books"
            title={book.replace("_", "/").toUpperCase()}
          >
            {availableBooks.map(item => {
              const typeCoin = item.book.replace("_", "/");
              return (
                <MenuItem
                  key={item.book}
                  className={item.book === book ? "rc-menu-item-active" : ""}
                >
                  <div style={{ paddingRight: 50 }}>
                    <span>{typeCoin.toUpperCase()}</span>
                  </div>
                </MenuItem>
              );
            })}
          </SubMenu>
        </Menu>
        <div className="subheader-container__right">
          <div>
            <span>Volumen 24 hrs. </span>
            <span className="lighter-text">{`${
              ticker.volume
            } ${coin[0].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Max. </span>
            <span className="lighter-text">{`${formatNumber(
              coin,
              ticker.high
            )} ${coin[1].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Min. </span>
            <span className="lighter-text">{`${formatNumber(
              coin,
              ticker.low
            )} ${coin[1].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Variación </span>
            <span className="lighter-text">
              {`${numeral(Number(ticker.last - ticker.vwap).toFixed(2)).format(
                "0,0.00"
              )}
                (${numeral((ticker.last - ticker.vwap) / ticker.vwap).format(
                  "0.0%"
                )})`}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Subheader;
