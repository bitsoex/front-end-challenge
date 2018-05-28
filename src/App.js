import React from "react";
import { BookProvider } from "./context/Book";
import { ThemeProvider } from "./context/Theme";
import App from "./containers/App";

export default () => (
  <ThemeProvider>
    <BookProvider>
      <App />
    </BookProvider>
  </ThemeProvider>
);
