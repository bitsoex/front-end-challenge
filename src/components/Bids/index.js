import React, { Component } from "react";
import { css, keyframes } from "emotion";
import dayjs from "dayjs";
import OrderBook from "../../containers/OrderBook";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";
import { formatToLocaleString } from "../../utils";

const styles = {
  container: css`
    font-size: small;
  `,
  title: css`
    padding 10px 20px;
  `,
  listContainer: css`
    color: ${colors.sidebar.text};
  `,
  row: css`
    display: flex;
    justify-content: space-around;
  `,
  columnTitle: css``,
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

export default class Asks extends Component {
  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <OrderBook>
            {({ book, asks }) => {
              const [from, to] = book.toUpperCase().split("_");
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
                    ÚLTIMOS TRADES
                  </div>
                  <div className={styles.listContainer}>
                    <div
                      className={css`
                        ${styles.row};
                        padding: 10px 0;
                      `}
                    >
                      <div>HORA</div>
                      <div>
                        {to}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          PRECIO
                        </span>
                      </div>
                      <div>
                        {from}&nbsp;
                        <span style={{ color: colors.sidebar.light }}>
                          MONTO
                        </span>
                      </div>
                    </div>
                    {asks.map((trade, i) => (
                      <div
                        key={i}
                        style={{ "--i": i }}
                        className={css`
                          ${styles.row} ${animations.slideLeft}
                          &:hover {
                            background: ${colors.navy.regular};
                            color: ${colors.sidebar.light};
                            .price {
                              color: ${trade.maker_side === "buy"
                                ? colors.green.light
                                : colors.red.light};
                            }
                          }
                          .price {
                            color: ${trade.maker_side === "buy"
                              ? colors.green.dark
                              : colors.red.dark};
                          }
                          .amount {
                            color: ${colors.sidebar.light};
                          }
                        `}
                      >
                        <div>{this.formatDate(trade.created_at)}</div>{" "}
                        <div className="price">
                          {formatToLocaleString(+trade.price)}
                        </div>
                        <div className="amount">
                          <Amount amount={trade.amount} />
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
