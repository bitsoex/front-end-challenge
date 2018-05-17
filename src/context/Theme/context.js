import { createContext } from "react";

export const themes = {
  light: {
    name: "light",
    color: "#4e5863",
    background: "#eeeeee"
  },
  dark: {
    name: "dark",
    color: "#b0bac1",
    background: "#313d4c"
  }
};

export const ThemeContext = createContext(
  themes.dark // default value
);
