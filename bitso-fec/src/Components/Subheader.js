import React, { Component } from "react";
import axios from "axios";
import numeral from "numeral";
import Menu, { SubMenu, MenuItem } from "rc-menu";

class Subheader extends Component {
  state = {
    book: null,
    availableBooks: null,
    ticker: null,
    loading: true
  };
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

  async handleSelect(book) {
    const ticker = await this.handleTicker(book);
    this.setState({
      ticker,
      book,
      loading: false
    });
    this.props.onSelectBook(book);
  }

  render() {
    const { loading, availableBooks, ticker, book } = this.state;
    if (loading) return <div>Cargando...</div>;
    const coin = book.split("_");
    return (
      <div className="subheader-container">
        <Menu mode="horizontal" onSelect={book => this.handleSelect(book.key)}>
          <SubMenu
            key="available__books"
            title={book.replace("_", "/").toUpperCase()}
          >
            {availableBooks.map(book => {
              const typeCoin = book.book.replace("_", "/");
              return (
                <MenuItem key={book.book}>
                  <div style={{ paddingRight: 50 }}>
                    <span>{typeCoin.toUpperCase()}</span>
                  </div>
                </MenuItem>
              );
            })}
          </SubMenu>
        </Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flex: 1,
            marginRight: "50rem",
            fontSize: "1.6rem"
          }}
        >
          <div>
            <span>Volumen 24 hrs. </span>
            <span className="lighter-text">{`${
              ticker.volume
            } ${coin[0].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Max. </span>
            <span className="lighter-text">{`${numeral(ticker.high).format(
              "0,0.00"
            )} ${coin[1].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Min. </span>
            <span className="lighter-text">{`${numeral(ticker.low).format(
              "0,0.00"
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
