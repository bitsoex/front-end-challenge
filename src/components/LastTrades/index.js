import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { trades as getTrades } from "../../api";

const styles = {
  container: css``,
  title: css``,
  listContainer: css``,
  listHeader: css``,
  list: css``,
  item: css``
};

export default class LastTrades extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired
  };

  state = { trades: [] };

  async componentDidMount() {
    const { book } = this.props;
    const trades = await getTrades({ book });
    this.setState({ trades });
  }

  formatDate = date => date;

  render() {
    const { trades } = this.state;
    console.log(trades);
    return (
      <div>
        <div className={styles.title}>Last trades</div>
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            <li className={cx(styles.item, styles.listHeader)}>
              <span>HORA</span> <span>MXN PRECIO</span> <span>BTC MONTO</span>
            </li>
            {trades.map(trade => (
              <li className={styles.item}>
                <span>{this.formatDate(trade.created_at)}</span>{" "}
                <span>{trade.price}</span> <span>{trade.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
