import React from "react";
import { css, cx } from "emotion";
import bitsoLogo from "../../bitso_logo.svg";
import { BookConsumer } from "../../context/Book";
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
  <BookConsumer>
    {({ book, bookDetails }) => (
      <Header book={book.book} bookDetails={bookDetails} />
    )}
  </BookConsumer>
);

function Header({ book, bookDetails }) {
  const [from, to] = book.toUpperCase().split("_");
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <header
          style={
            theme.name === "dark"
              ? { ...theme, background: colors.navy.header }
              : { ...theme, background: colors.gray.light }
          }
          className={styles.container}
        >
          <ul className={styles.nav} role="navigation">
            <li className={cx(styles.left, styles.navItem)}>
              <img src={bitsoLogo} className={styles.logo} alt="Bisto logo" />
              &nbsp;<span className={styles.separator} />&nbsp; Exchange
            </li>

            <li className={styles.navItem}>
              1 {from} ={" "}
              {(+bookDetails.last).toLocaleString("es-MX", {
                minimumFractionDigits: 2
              })}{" "}
              {to}
            </li>

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
}
