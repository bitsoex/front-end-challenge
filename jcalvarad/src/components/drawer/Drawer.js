import React, { Component } from "react";
import FontIcon from "react-toolbox/lib/font_icon/FontIcon";
import theme from "./Drawer.module.css";

class SideDrawer extends Component {
  state = {
    active: false,
    width: "50px"
  };

  handleToggle = () => {
    const width = this.state.active ? "50px" : "250px";
    this.setState({ active: !this.state.active, width });
  };

  render() {
    const themeAll = { ...theme, ...this.props.theme };
    console.log(this.state.width);
    return (
      <div>
        <div style={{ width: this.state.width }} className={themeAll.sidenav}>
          <FontIcon className={themeAll.closebtn} value={this.state.active ? "chevron_right" : "chevron_left"} onClick={this.handleToggle} />
        </div>
      </div>
    );
  }
}

export default SideDrawer;
