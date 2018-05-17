import React, { Component, createContext } from "react";
// thanks to https://twitter.com/aweary/status/995496327931822080
import memoize from "memoize-one";

export const BooksContext = createContext();

export const ThemeConsumer = BooksContext.Consumer;

export class ThemeProvider extends Component {
  state = { book: "" };

  componentDidMount() {}

  changeBook = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  };

  getContext = memoize(theme => ({
    theme,
    toggleTheme: this.toggleTheme
  }));

  render() {
    const { theme } = this.state;
    const context = this.getContext(theme);

    return (
      <BooksContext.Provider value={context}>
        {this.props.children}
      </BooksContext.Provider>
    );
  }
}
