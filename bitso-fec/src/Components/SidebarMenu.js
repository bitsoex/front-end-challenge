import React, { Component } from "react";
import { Transition } from "react-transition-group";
import icon_dropdown from "../assets/Images/SVG/icon_dropdown.svg";

class SidebarMenu extends Component {
  state = {
    toogle: false
  };
  render() {
    const { toogle } = this.state;
    console.log(this.props.trades);
    return (
      <Transition in={toogle} timeout={300}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <span
              onClick={() => this.setState({ toogle: !this.state.toogle })}
              className="div_block-sidebar"
            >
              <div className="sidebar_content">
                <img src={icon_dropdown} className="icon_dropdown" alt="logo" />
                MERCADOS
              </div>
            </span>
            <div
              style={{
                marginLeft: 2,
                flex: 1,
                backgroundColor: "#23292d",
                display: "flex",
                position: "relative",
                width: "280px"
              }}
            >
              <span style={{ backgroundColor: "#727c84", width: "280px" }}>MERCADOS 24 HRS</span>
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
    backgroundColor: "#191e23",
    letf: 0
  },
  entered: {
    position: "relative",
    left: -280,
    width: "320px",
    backgroundColor: "#191e23"
  },
  exiting: {
    position: "relative",
    left: 0,
    width: "40px",
    backgroundColor: "#191e23"
  }
};
export default SidebarMenu;
