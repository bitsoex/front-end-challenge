import React, { Component } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import NavbarHeader from "./Components/NavbarHeader";

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
        <NavbarHeader />
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
