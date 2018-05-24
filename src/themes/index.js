/**
 * Color Palette:
 */

const DARK_GREEN = "#466830";
const MEDIUM_GREEN = "#86af6b";
const REGULAR_GREEN = "#80c156";
const LIGHT_GREEN = "#98d372";

const DARK_RED = "#722837";
const REGULAR_RED = "#cc4458";
const MEDIUM_RED = "#ba3040";
const LIGHT_RED = "#ff0033";

const DARK_NAVY = "#161a1e";
const BACKGROUND_NAVY = "#191e23";
const REGULAR_NAVY = "#252c36";
const MEDIUM_NAVY = "#384555";
const NAVY_HEADERS = "#313d4c";

const DARK_TEXT = "#4e5863";
const LIGHT_TEXT = "#b0bac1";
const LIGHT_BACKGROUND = "#eeeeee";

const SIDEBAR_BACKGROUND = "#23292d";
const SIDEBAR = "#2e353d";
const SIDEBAR_HEADER = "#727c84";
const SIDEBAR_TEXT = "#747f89";
const SIDEBAR_LIGHT_TEXT = "#b0bac1";
const LIGHT_GRAY = "#ababab";
const NEUTRAL_GRAY = "#cccccc";
const BITCOIN_YELLOW = "#ebc256";

export const colors = {
  green: {
    dark: DARK_GREEN,
    medium: MEDIUM_GREEN,
    regular: REGULAR_GREEN,
    light: LIGHT_GREEN
  },
  red: {
    dark: DARK_RED,
    medium: MEDIUM_RED,
    regular: REGULAR_RED,
    light: LIGHT_RED
  },
  navy: {
    header: NAVY_HEADERS,
    background: BACKGROUND_NAVY,
    regular: REGULAR_NAVY,
    medium: MEDIUM_NAVY,
    dark: DARK_NAVY
  },
  sidebar: {
    regular: SIDEBAR,
    background: SIDEBAR_BACKGROUND,
    header: SIDEBAR_HEADER,
    text: SIDEBAR_TEXT,
    light: SIDEBAR_LIGHT_TEXT
  },
  gray: {
    light: LIGHT_GRAY,
    regular: NEUTRAL_GRAY
  },
  yellow: {
    regular: BITCOIN_YELLOW
  }
};

export default {
  light: {
    name: "light",
    color: DARK_TEXT,
    background: LIGHT_BACKGROUND
  },
  dark: {
    name: "dark",
    color: LIGHT_TEXT,
    background: BACKGROUND_NAVY
  }
};
