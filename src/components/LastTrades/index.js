import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { css, cx, keyframes } from "emotion";
import dayjs from "dayjs";
import { trades as getTrades } from "../../api";

const styles = {
  container: css`
    max-width: 300px;
  `,
  title: css`
    padding 10px;
  `,
  listContainer: css``,
  ul: css`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding 0;
    margin: 0;
    list-style: none;
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
    console.log("componentDidMount");
    this.fetchTrades();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
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
      <div className={styles.container}>
        <div className={styles.title}>ÚLTIMOS TRADES</div>
        <div className={styles.listContainer}>
          {/* <ul className={styles.ul}>
            <li className={cx(styles.item, styles.listHeader)}>
              <span>HORA</span> <span>MXN PRECIO</span> <span>BTC MONTO</span>
            </li>
            {trades.map((trade, i) => (
              <li
                key={trade.tid}
                style={{ "--i": i }}
                className={css`
                  animation: ${styles.slideLeft} 0.3s both;
                  animation-delay: calc(var(--i) * 0.1s);
                `}
              >
                <span>{this.formatDate(trade.created_at)}</span>{" "}
                <span>{trade.price}</span> <span>{trade.amount}</span>
              </li>
            ))}
          </ul> */}
          <div
            className={css`
              ${styles.row} ${styles.title};
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
                ${styles.row}
                animation: ${styles.slideLeft} 0.3s both;
                animation-delay: calc(var(--i) * 0.1s);
              `}
            >
              <div>{this.formatDate(trade.created_at)}</div>{" "}
              <div>{trade.price}</div>
              <div>{trade.amount}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
