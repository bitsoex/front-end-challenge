import React from "react";
import { css, cx } from "emotion";
import bitsoLogo from "../../bitso_logo.svg";
import { ThemeConsumer } from "../../context/Theme";
import ThemeToggler from "../ThemeToggler";
import { colors } from "../../themes";

const styles = {
  container: css`
    padding: 10px;
  `,
  logo: css`
    height: 30px;
    margin-right: 5px;
  `,
  nav: css`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 10px;
    list-style: none;
  `,
  navItem: css`
    &:not(:last-child):not(:first-child) {
      margin: 0 5px;
    }
  `,
  left: css`
    margin-right: auto;
    display: flex;
    align-items: center;
  `,
  separator: css`
    ::after {
      content: "|";
    }
    font-size: 1.3em;
  `
};

export default () => (
  <ThemeConsumer>
    {({ theme }) => (
      <header
        style={
          theme.name === "dark"
            ? { ...theme, background: colors.navy.header }
            : { ...theme, background: colors.gray.regular }
        }
        className={styles.container}
      >
        <ul className={styles.nav} role="navigation">
          <li className={cx(styles.left, styles.navItem)}>
            <img src={bitsoLogo} className={styles.logo} alt="Bisto logo" />
            &nbsp;<span className={styles.separator} />&nbsp; Exchange
          </li>

          <li className={styles.navItem}>1 BTC = 000,000.00 MXN</li>

          <li className={styles.navItem}>
            <span className={styles.separator} />
          </li>

          <li className={styles.navItem}>Wallet</li>
          <li className={styles.navItem}>Exchange</li>
          <li className={styles.navItem}>Ayuda</li>
          <li className={styles.navItem}>Usuario</li>
          <li className={styles.navItem}>
            <ThemeToggler />
          </li>
        </ul>
      </header>
    )}
  </ThemeConsumer>
);
