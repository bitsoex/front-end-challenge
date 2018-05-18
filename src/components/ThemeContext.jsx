import React from 'react'

export const themes = {
    day: {
        foreground: '#000000',
        background: '#eeeeee',
        themeImage: 'light.png',
        greenDark: '#4c703c',
        greenLight: '#86af6b',
        grayDark: '#cccccc',
        grayLight: '#636a70',
        gray: '#4e5863',
        blueLight: '#b0bac1',
        bodyExchangeColor: '#191e23',
        bodyMarkets: '#23292d',
        headerMarkets: '#cccccc',
        headerMarketsHover: '#2e353d',
        headerMarketTitle: '#434b50',
        redLight: '#f00e2f',
        redDark: '#cc4447',
        activeMarket: '#161a1e',
    },

    night: {
        foreground: '#cccccc',
        background: '#161a1e',
        themeImage: 'dark.png',
        greenDark: '#4c703c',
        greenLight: '#86af6b',
        grayDark: '#636a70',
        grayLight: '#cccccc',
        gray: '#4e5863',
        blueLight: '#b0bac1',
        bodyExchangeColor: '#191e23',
        bodyMarkets: '#23292d',
        headerMarkets: '#2e353d',
        headerMarketsHover: '#cccccc',
        headerMarketTitle: '#434b50',
        redLight: '#f00e2f',
        redDark: '#cc4447',
        activeMarket: '#161a1e',
    }
}

export const ThemeContext = React.createContext(themes.night);

export default ThemeContext ;