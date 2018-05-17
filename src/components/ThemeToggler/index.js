import React from "react";
import { ThemeConsumer } from "../../context/Theme";
import Toggle from "../Toggle";

export default () => (
  <ThemeConsumer>
    {({ theme, toggleTheme }) => <Toggle onToggle={toggleTheme} />}
  </ThemeConsumer>
);
