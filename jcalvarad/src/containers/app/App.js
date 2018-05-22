import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import '../../assets/react-toolbox/theme.css';
import theme from '../../assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import styles from './App.module.css';
import Layout from '../layout/Layout'
import Trades from '../trades/Trades'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet" />
          </Helmet>
          <Layout>
            <div className={styles['grid-container']}>
              <div className={styles.header}>Header</div>
              <div className={styles.trades}><Trades/></div>
              <div className={styles.chart}>Chart</div>  
              <div className={styles.buy}>Buy</div>
              <div className={styles.sell}>Sell</div>
            </div>
          </Layout>
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
