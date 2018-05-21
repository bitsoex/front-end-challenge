import React, { Component } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import NavbarHeader from "./Components/NavbarHeader";

/*
* App Component
* Main Exchange component
*/
class App extends Component {
  state = {
    book: "btc_mxn"
  };

  /**
   * Function to redirect to selected book dashboard.
   * @alias onSelectBook
   * @param {string} book selected ticker
   */
  onSelectBook = book => {
    this.setState({ book });
    this.props.history.push(`/${book}`);
  };

  render() {
    const { book } = this.state;
    return (
      <div className="App">
        {/* Main exchange navbar */}
        <NavbarHeader />
        {/* Exhange Router for books Dashboard rendering */}
        {/* <Switch> */}
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
        {/* </Switch> */}
      </div>
    );
  }
}

export default withRouter(App);
