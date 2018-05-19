import React, { Component } from "react";
import { Transition } from "react-transition-group";
import axios from "axios";
import _ from "lodash";
import map from "async/map";

import { parseChartData } from "../Utils";
import icon_dropdown from "../assets/Images/SVG/icon_dropdown.svg";
import SidebarMenuItem from "./SidebarMenuItem";

class SidebarMenu extends Component {
  state = {
    toggle: false,
    listData: null,
    loading: true
  };

  async componentDidMount() {
    const books = (await axios.get("https://api.bitso.com/v3/available_books/"))
      .data.payload;
    map(books, this.getListData, (err, results) => {
      // console.log(results, err);
      this.setState({ listData: results, loading: false });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.listData) {
      return true;
    }

    if (this.state.toggle !== nextState.toggle) {
      return true;
    }

    return false;
  }

  getListData = (item, callback) => {
    axios
      .get(`https://bitso.com/trade/chartJSON/${item.book}/1month`)
      .then(async response => {
        const { data } = response;
        const lastData = data.slice(-1)[0];
        const diff = lastData.close - lastData.vwap;
        const profit = diff / lastData.vwap * 100;

        callback(null, {
          book: item.book,
          tradeData: data,
          price: +lastData.close,
          diff,
          profit,
          ...parseChartData(data)
        });
      })
      .catch(err => callback(err));
  };

  toggleSidebar = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { loading, toggle, listData } = this.state;
    return (
      <Transition in={toggle} timeout={100}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <span onClick={this.toggleSidebar} className="div_block-sidebar">
              <div className="sidebar_content">
                <img src={icon_dropdown} className="icon_dropdown" alt="logo" />
                MERCADOS
              </div>
            </span>
            <div className="market-list__container">
              <div className="market-list__header">MERCADOS 24 HRS</div>
              <div className="market-list">
                {loading ? (
                  <div>Cargando...</div>
                ) : (
                    _.map(listData, item => (
                      <SidebarMenuItem key={item.book} item={item} />
                    ))
                  )}
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}

const duration = 300;
const defaultStyle = {
  transition: `all ${duration}ms linear`,
  display: "flex",
  left: 0,
  width: "40px",
  backgroundColor: "transparent"
};

const transitionStyles = {
  entering: {
    backgroundColor: "var(--sidebar-background)",
    width: "320px",
    letf: 0
  },
  entered: {
    position: "relative",
    left: -280,
    width: "320px",
    backgroundColor: "var(--sidebar-background)"
  },
  exiting: {
    position: "relative",
    width: "320px",
    left: 0,
    backgroundColor: "var(--sidebar-background)"
  }
};

export default SidebarMenu;
