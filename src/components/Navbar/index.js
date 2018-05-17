import React, { Component } from "react";
import { css } from "emotion";
import bitsoLogo from "../../bitso_logo.svg";
import { ThemeConsumer } from "../../context/Theme";
import ThemeToggler from "../ThemeToggler";

const styles = {
  container: css`
    display: flex;
    align-items: center;
    background: hotpink;
    padding: 10px;
    justify-content: space-between;
  `,
  logo: css`
    height: 30px;
    margin: 0 10px;
  `,
  content: css`
    display: flex;
    align-items: center;
  `,
  contentRight: css`
    display: flex;
  `,
  item: css`
    min-width: 70px;
    margin: auto;
  `
};

export default class Header extends Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <header style={theme} className={styles.container}>
            <div className={styles.content}>
              <img src={bitsoLogo} className={styles.logo} alt="Bisto logo" />
              | Exchange
            </div>
            <div className={styles.contentRight}>
              <div className={styles.item}>1 BTC =</div>
              <div className={styles.item}>000,000.00</div>
              <div className={styles.item}>MXN</div>
              <div className={styles.item}>|</div>

              <div className={styles.item}>Wallet</div>
              <div className={styles.item}>Exchange</div>
              <div className={styles.item}>Ayuda</div>
              <div className={styles.item}>Usuario</div>
              <div className={styles.item}>
                <ThemeToggler />
              </div>
            </div>
          </header>
        )}
      </ThemeConsumer>
    );
  }
}
