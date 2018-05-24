import React from "react";
import { css, cx } from "emotion";
import { ThemeConsumer } from "../../context/Theme";
import { BookConsumer } from "../../context/Book";
import DropDown from "../DropDown";
import { colors } from "../../themes";

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
  `
};

export default () => (
  <ThemeConsumer>
    {({ theme }) => (
      <BookConsumer>
        {({ availableBooks, book, changeBook }) => {
          const {
            minimum_price,
            maximum_price,
            minimum_amount,
            maximum_amount
          } = book;
          const currency1 = book.book.split("_")[0].toUpperCase();
          const currency2 = book.book.split("_")[1].toUpperCase();

          // const high = +book.high;
          // const low = +book.low;
          // const variation = high - low;
          // const variationPercentage = variation / low * 100; // Formula to get variation?

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

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Volúmen 24hrs.</span>{" "}
                {(+maximum_amount + +minimum_amount) / 2} {currency1}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Max.</span> {maximum_price}{" "}
                {currency2}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Min.</span> {minimum_price}{" "}
                {currency2}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Variacion.</span>{" "}
                {currency2} 1.4%
              </div>
            </div>
          );
        }}
      </BookConsumer>
    )}
  </ThemeConsumer>
);
