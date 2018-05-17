import React, { Component } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";

import bitso_logo from "./assets/Images/SVG/bitso_logo.svg";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  state = {
    book: "btc_mxn"
  };

  onSelectBook = book => {
    console.log(book);
    this.setState({ book });
    this.props.history.push(`/${book}`);
  };

  render() {
    const { book } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={bitso_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EXCHANGE</h1>
        </header>
        <Switch>
          <Redirect exact from="/" to="/btc_mxn" />
          <Route
            path="/:book"
            key={book}
            render={props => (
              <Dashboard
                book={book}
                onSelectBook={this.onSelectBook}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
