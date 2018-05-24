import { createContext } from "react";
import themes from "../../themes";

export { themes };
export const ThemeContext = createContext(
  themes.dark // default value
);
