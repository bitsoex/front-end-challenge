import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { css, cx, keyframes } from "emotion";
import dayjs from "dayjs";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import { trades as getTrades } from "../../api";
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
    book: PropTypes.string.isRequired
  };

  state = { trades: [] };

  shouldComponentUpdate(nextProps) {
    const { book } = this.props;
    const { trades } = this.state;
    console.log(
      "shouldComponentUpdate",
      book !== nextProps.book || trades.length === 0
    );
    return book !== nextProps.book || trades.length === 0;
  }

  componentDidMount() {
    this.fetchTrades();
  }

  componentDidUpdate() {
    this.fetchTrades();
  }

  fetchTrades = async () => {
    const { book } = this.props;
    const trades = await getTrades({ book });
    this.setState({ trades });
  };

  formatDate = date => dayjs(date).format("HH:mm:ss");

  render() {
    const { trades } = this.state;
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
                <div>MXN PRECIO</div>
                <div>BTC MONTO</div>
              </div>
              {trades.map((trade, i) => (
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
                  <div className="price">{trade.price}</div>
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
