import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, keyframes } from "emotion";
import dayjs from "dayjs";
import OrderBook from "../../containers/OrderBook";
import { ThemeConsumer } from "../../context/Theme";
import { colors } from "../../themes";
import Amount from "../Amount";

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
          <OrderBook>{({ asks }) => <div>Children</div>}</OrderBook>
        )}
      </ThemeConsumer>
    );
  }
}
