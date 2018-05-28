import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, keyframes } from "emotion";
import dayjs from "dayjs";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";

const styles = {
  container: css``,
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

export default class LastTrades extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
    lastTrades: PropTypes.array.isRequired
  };

  static defaultProps = { lastTrades: [] };

  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    const { book, lastTrades } = this.props;
    const currency1 = book.split("_")[0].toUpperCase();
    const currency2 = book.split("_")[1].toUpperCase();
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
                  {currency2}&nbsp;
                  <span style={{ color: colors.sidebar.light }}>PRECIO</span>
                </div>
                <div>
                  {currency1}&nbsp;
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
                  <div>{this.formatDate(trade.created_at)}</div>{" "}
                  <div className="price">
                    {(+trade.price).toLocaleString("es-MX", {
                      minimumFractionDigits: 2
                    })}
                  </div>
                  <div className="amount">
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
