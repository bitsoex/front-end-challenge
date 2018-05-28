import React, { Component } from "react";
import AppHeader from "../../components/header_bar/HeaderBar";
import MarketsDrawer from "../markets_drawer/MarketsDrawer";
import BooksHeader from "../books_header/BooksHeader";
import styles from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <AppHeader />
        <div className={styles["books-header"]}>
          <BooksHeader />
        </div>
        <div className={styles.container}>
          <div>
            <div className={styles["main-view"]}>{this.props.children}</div>
            <div className={styles.drawer}>
              <MarketsDrawer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
