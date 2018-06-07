import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, keyframes } from "emotion";
import dayjs from "dayjs";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";
import { getCurrencies, formatToLocaleString } from "../../utils";

const styles = {
  container: css`
    font-size: small;
  `,
  title: css`
    padding 10px 20px;
    display: flex;
    justify-content: space-between;
    text-align: right;
  `,
  listContainer: css`
    color: ${colors.sidebar.text};
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    padding: 3px 0px;
  `,
  item: css`
    flex: 1;
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

export default class LastTrades extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
    lastTrades: PropTypes.array.isRequired
  };

  static defaultProps = { lastTrades: [] };

  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    const { book, lastTrades } = this.props;
    const [from, to] = getCurrencies(book);
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className={styles.container}>
            <div
              style={
                theme.name === "dark"
                  ? { ...theme, background: colors.navy.header }
                  : { ...theme, background: colors.gray.light }
              }
              className={styles.title}
            >
              <b>ÚLTIMOS TRADES</b>
            </div>
            <div className={styles.listContainer}>
              <div
                className={css`
                  ${styles.row};
                  padding: 10px 0;
                `}
              >
                <div className={styles.item}>HORA</div>
                <div className={styles.item}>
                  {to}&nbsp;
                  <span style={{ color: colors.sidebar.light }}>PRECIO</span>
                </div>
                <div className={styles.item}>
                  {from}&nbsp;
                  <span style={{ color: colors.sidebar.light }}>MONTO</span>
                </div>
              </div>
              {lastTrades.map((trade, i) => (
                <div
                  key={trade.tid}
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
                  <div className={styles.item}>
                    {this.formatDate(trade.created_at)}
                  </div>{" "}
                  <div className={`${styles.item} price`}>
                    {formatToLocaleString(+trade.price)}
                  </div>
                  <div className={`${styles.item} amount`}>
                    <Amount amount={trade.amount} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
