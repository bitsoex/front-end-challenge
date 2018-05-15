import React from 'react'

export const themes = {
    day: {
        foreground: '#000000',
        background: '#eeeeee',
    },

    night: {
        foreground: '#000000',
        background: '#161a1e',
    }
}

export const ThemeContext = React.createContext(themes.night);

export default ThemeContext ;