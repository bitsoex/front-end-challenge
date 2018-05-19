import React, { Component } from "react";
import axios from "axios";
import numeral from "numeral";
import Menu, { SubMenu, MenuItem } from "rc-menu";

class Subheader extends Component {
  state = {
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

  // handleSelect = async book => {
  //   console.log(book);
  //   const ticker = await this.handleTicker(book);
  //   this.setState({
  //     ticker,
  //     loading: false
  //   });
  // };

  render() {
    const { onSelectBook, book } = this.props;
    const { loading, availableBooks, ticker } = this.state;
    if (loading) return <div>Cargando...</div>;
    const coin = book.split("_");
    // console.log(ticker);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flex: 1,
            marginRight: "36rem",
            marginLeft: "4rem",
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
            <span className="lighter-text">{`${
              ticker.high < 1
                ? numeral(ticker.high).format("0.00000000")
                : numeral(ticker.high).format("$0,0.00")
            } ${coin[1].toUpperCase()}`}</span>
          </div>
          <div>
            <span>Min. </span>
            <span className="lighter-text">{`${
              ticker.low < 1
                ? numeral(ticker.low).format("0.00000000")
                : numeral(ticker.low).format("$0,0.00")
            } ${coin[1].toUpperCase()}`}</span>
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
