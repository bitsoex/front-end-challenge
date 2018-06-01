import React, { Component } from "react";
import { css, keyframes } from "emotion";
import dayjs from "dayjs";
import OrderBook from "../../containers/OrderBook";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";
import {
  getCurrencies,
  formatToLocaleString,
  computeOrderBookValues
} from "../../utils";
import styles, { animations } from "./styles";

export default class Asks extends Component {
  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <OrderBook>
            {({ book, bookDetails, asks }) => {
              const [from, to] = getCurrencies(book);
              const computedAsks = computeOrderBookValues(asks);
              return (
                <div className={styles.container}>
                  <div
                    style={
                      theme.name === "dark"
                        ? { ...theme, background: colors.navy.header }
                        : { ...theme, background: colors.gray.light }
                    }
                    className={styles.title}
                  >
                    <div>
                      {formatToLocaleString(bookDetails.ask)} Ask {to}
                    </div>
                    <div>
                      <b>POSTURAS DE VENTA</b>
                    </div>
                  </div>
                  <div className={styles.listContainer}>
                    <div
                      className={css`
                        ${styles.row};
                        padding: 10px 0;
                      `}
                    >
                      <div className={styles.item}>
                        {to}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          PRECIO
                        </span>
                      </div>

                      <div className={styles.item}>{to} VALOR</div>

                      <div className={styles.item}>
                        {from}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          MONTO
                        </span>
                      </div>

                      <div className={styles.item}>SUM</div>
                    </div>
                    {computedAsks.map((ask, i) => (
                      <div
                        key={i}
                        style={{ "--i": i }}
                        className={css`
                          ${styles.row} ${animations.slideLeft}
                          &:hover {
                            background: ${colors.navy.regular};
                            color: ${colors.sidebar.light};
                          }
                          .price {
                            color: ${colors.red.light};
                          }
                          .amount {
                            color: ${colors.sidebar.light};
                          }
                        `}
                      >
                        <div className={`${styles.item} price`}>
                          {formatToLocaleString(+ask.price)}
                        </div>

                        <div className={styles.item}>
                          {formatToLocaleString(+ask.value, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>

                        <div className={`${styles.item} amount`}>
                          <Amount amount={ask.amount} />
                        </div>

                        <div className={styles.item}>
                          {formatToLocaleString(ask.sum, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          </OrderBook>
        )}
      </ThemeConsumer>
    );
  }
}
