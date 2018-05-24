import React from 'react'

/**
 * Valores de colores para lo temas night o day
 * 
 */
export const themes = {
    day: {
        foreground: '#000000',
        background: '#eeeeee',
        themeImage: 'light.png',
        greenDark: '#98d372',
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
        greenHover: '#6e8f66',
        headerBid: '#27313c',
        headerAsk: '#1f252d',
        greenLine: '#44583f',
        redLine: '#59252e',
        greenFill: '#618e47',
        redFill: '#892b36',
        volFill: '#1c2228',
        volLine: '#384555',
        gridColor: '#2a333d',
    },

    night: {
        foreground: '#cccccc',
        background: '#161a1e',
        themeImage: 'dark.png',
        greenDark: '#86af6b',
        greenLight: '#98d372',
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
        greenHover: '#6e8f66',
        headerBid: '#27313c',
        headerAsk: '#1f252d',
        greenLine: '#618e47',
        redLine: '#892b36',
        greenFill: '#44583f',
        redFill: '#59252e',
        volFill: '#384555',
        volLine: '#1c2228',
        gridColor: '#2a333d',
    }
}

/**
 * Definicion del tema night por default
 */
export const ThemeContext = React.createContext(themes.night);

export default ThemeContext ;