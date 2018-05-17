import React, { Component } from "react";
import { css, cx } from "emotion";
import bitsoLogo from "../../bitso_logo.svg";
import { ThemeConsumer } from "../../context/Theme";
import ThemeToggler from "../ThemeToggler";
import DropDown from "../DropDown";

const styles = {
  container: css`
    display: flex;
    align-items: center;
    background: hotpink;
    padding: 10px;
    justify-content: space-between;
  `,
  logo: css`
    height: 30px;
    margin: 0 10px;
  `,
  content: css`
    display: flex;
    align-items: center;
  `,
  contentRight: css`
    display: flex;
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
  `
};

export default class InfoBar extends Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div
            style={{
              ...theme,
              background: theme.name === "dark" ? "#191e23" : "#cccccc"
            }}
            className={styles.container}
          >
            <DropDown
              items={["BTC/MXN", "ETH/MXN", "TY/MXN", "WTF/MXN"]}
              selectedItem={"TY/MXN"}
              containerClassName={cx(styles.item, styles.bookSelector)}
              containerStyle={{
                color: theme.name === "dark" ? "" : "#466830"
              }}
            />

            <div className={styles.item}>
              <span className={styles.itemPrefix}>Volúmen 24hrs.</span>{" "}
              170.5405818 BTC
            </div>

            <div className={styles.item}>
              <span className={styles.itemPrefix}>Max.</span> 170.5405818 MXN
            </div>

            <div className={styles.item}>
              <span className={styles.itemPrefix}>Min.</span> 170.5405818 MXN
            </div>

            <div className={styles.item}>
              <span className={styles.itemPrefix}>Variacion.</span> 170.5405818
              MXN
            </div>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
