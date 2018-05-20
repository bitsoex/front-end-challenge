import React from 'react'

export const themes = {
    day: {
        foreground: '#000000',
        background: '#eeeeee',
        themeImage: 'light.png',
        greenDark: '#86af6b',
        greenLight: '#60af2c',
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
        headerTrader: '#27313c',
    },

    night: {
        foreground: '#cccccc',
        background: '#161a1e',
        themeImage: 'dark.png',
        greenDark: '#86af6b',
        greenLight: '#60af2c',
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
        headerTrader: '#27313c',
    }
}

export const ThemeContext = React.createContext(themes.night);

export default ThemeContext ;