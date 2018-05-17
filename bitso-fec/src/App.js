import React, { Component } from "react";
import Dashboard from "./Components/Dashboard";
import Subheader from "./Components/Subheader";
import NavbarHeader from "./Components/NavbarHeader";

class App extends Component {
  websocket = new WebSocket("wss://ws.bitso.com");
  state = {
    book: "btc_mxn",
    ticker: {},
    books: null,
    orders: null,
    last: null,
    trades: null
  };

  componentDidMount() {
    const { book } = this.state;
    this.websocket.onopen = () => {
      this.websocket.send(
        JSON.stringify({ action: "subscribe", book, type: "trades" })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book,
          type: "diff-orders"
        })
      );
      // this.websocket.send(
      //   JSON.stringify({ action: "subscribe", book, type: "orders" })
      // );
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  onSelectBook(book, last) {
    this.setState({ book, last });
    // this.websocket.send(
    //   JSON.stringify({
    //     action: "subscribe",
    //     book,
    //     type: "diff-orders"
    //   })
    // );
  }
  render() {
    const { book } = this.state;
    return (
      <div className="App">
        <NavbarHeader />
        <div className="div_block__container">
          <div className="div-block__container-subheader">
            <Subheader
              book={book}
              onSelectBook={({ book, last }) => this.onSelectBook(book, last)}
            />
          </div>
        </div>
        <Dashboard book={book} websocket={this.websocket} />
      </div>
    );
  }
}

export default App;
