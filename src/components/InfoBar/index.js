import React from "react";
import { css, cx, keyframes } from "emotion";
import { ThemeConsumer } from "../../context/Theme";
import { BookConsumer } from "../../context/Book";
import DropDown from "../DropDown";
import { colors } from "../../themes";
import { formatToLocaleString } from "../../utils";

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid ${colors.navy.header};
  `,
  item: css`
    min-width: 70px;
    margin: auto;
  `,
  bookSelector: css`
    color: #98d372;
    font-size: 20px;
  `,
  itemPrefix: css`
    font-weight: 100;
    color: ${colors.sidebar.text};
  `,
  slideLeft: keyframes`
    from {
      transform: translateX(50%);
      opacity: 0;
    }
  `
};

const animations = {
  slideLeft: css`
    animation: ${styles.slideLeft} 0.3s both;
    animation-delay: calc(var(--i) * 0.1s);
  `
};

export default () => (
  <ThemeConsumer>
    {({ theme }) => (
      <BookConsumer>
        {({ availableBooks, book, bookDetails, changeBook }) => {
          const [from, to] = book.book.toUpperCase().split("_");

          const high = +bookDetails.high;
          const low = +bookDetails.low;
          const variation = high - low;
          const variationPercentage = variation / low * 100; // Formula to get variation?

          return (
            <div style={theme} className={styles.container}>
              <DropDown
                containerStyle={
                  theme.name === "light" ? { color: colors.green.dark } : null
                }
                containerClassName={cx(styles.item, styles.bookSelector)}
                items={availableBooks.map(b => ({
                  value: b.book,
                  displayValue: b.book
                    .toUpperCase()
                    .split("_")
                    .join("/")
                }))}
                defaultSelectedItem={book.book}
                onChange={e => {
                  const bookValue = e.target.value;
                  const book = availableBooks.find(b => b.book === bookValue);
                  changeBook(book);
                }}
              />

              <div
                style={{ "--i": 1 }}
                className={`${styles.item} ${animations.slideLeft}`}
              >
                <span className={styles.itemPrefix}>Volúmen 24hrs.</span>{" "}
                {bookDetails.volume} {from}
              </div>

              <div
                style={{ "--i": 2 }}
                className={`${styles.item} ${animations.slideLeft}`}
              >
                <span className={styles.itemPrefix}>Max.</span>{" "}
                {formatToLocaleString(high)} {to}
              </div>

              <div
                style={{ "--i": 3 }}
                className={`${styles.item} ${animations.slideLeft}`}
              >
                <span className={styles.itemPrefix}>Min.</span>{" "}
                {formatToLocaleString(low)} {to}
              </div>

              <div
                style={{ "--i": 4 }}
                className={`${styles.item} ${animations.slideLeft}`}
              >
                <span className={styles.itemPrefix}>Variacion.</span>{" "}
                {formatToLocaleString(variation)} {to}{" "}
                {variationPercentage.toFixed(2)}%
              </div>
            </div>
          );
        }}
      </BookConsumer>
    )}
  </ThemeConsumer>
);
