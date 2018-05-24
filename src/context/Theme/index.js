import React, { Component } from "react";
// thanks to https://twitter.com/aweary/status/995496327931822080
import memoize from "memoize-one";
import { ThemeContext, themes } from "./context";

export const ThemeConsumer = ThemeContext.Consumer;

export class ThemeProvider extends Component {
  state = { theme: themes.dark };

  toggleTheme = () => {
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
      <ThemeContext.Provider value={context}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
