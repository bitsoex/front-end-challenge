import React, { Component } from "react";
import { css } from "emotion";
import dayjs from "dayjs";
import OrderBook from "../../containers/OrderBook";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";
import {
  computeOrderBookValues,
  getCurrencies,
  formatToLocaleString
} from "../../utils";
import styles, { animations } from "./styles";

export default class Asks extends Component {
  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <OrderBook>
            {({ book, bookDetails, bids }) => {
              const [from, to] = getCurrencies(book);
              const computedBids = computeOrderBookValues(bids);
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
                      <b>POSTURAS DE COMPRA</b>
                    </div>
                    <div>
                      {to} Bid {formatToLocaleString(+bookDetails.bid)}
                    </div>
                  </div>
                  <div className={styles.listContainer}>
                    <div
                      className={css`
                        ${styles.row};
                        padding: 10px 0;
                      `}
                    >
                      <div className={styles.item}>SUM</div>

                      <div className={styles.item}>
                        {from}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          MONTO
                        </span>
                      </div>

                      <div className={styles.item}>{to} VALOR</div>

                      <div className={styles.item}>
                        {to}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          PRECIO
                        </span>
                      </div>
                    </div>
                    {computedBids.map((bid, i) => (
                      <div
                        key={i}
                        style={{ "--i": i }}
                        className={css`
                          ${styles.row} ${animations.slideLeft}
                          &:hover {
                            background: ${colors.navy.regular};
                            color: ${colors.sidebar.light};
                            .price {
                              color: ${colors.green.light};
                            }
                          }
                          .price {
                            color: ${colors.green.dark};
                          }
                          .amount {
                            color: ${colors.sidebar.light};
                          }
                        `}
                      >
                        <div className={styles.item}>
                          {formatToLocaleString(bid.sum, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>

                        <div className={`${styles.item} amount`}>
                          <Amount amount={bid.amount} />
                        </div>

                        <div className={styles.item}>
                          {formatToLocaleString(+bid.value, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>

                        <div className={`${styles.item} price`}>
                          {formatToLocaleString(+bid.price)}
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
