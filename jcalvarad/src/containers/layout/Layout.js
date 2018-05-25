import React, { Component } from "react";
import AppHeader from "../../components/header_bar/HeaderBar";
import MarketsDrawer from "../markets_drawer/MarketsDrawer";
import styles from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <AppHeader />
        <div className={styles.container}>
          <div className={styles["main-view"]}>{this.props.children}</div>
          <MarketsDrawer />
        </div>
      </div>
    );
  }
}

export default Layout;
