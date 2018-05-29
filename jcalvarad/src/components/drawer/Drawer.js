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
          <div>
            <FontIcon className={themeAll.closebtn} value={this.state.active ? "chevron_right" : "chevron_left"} onClick={this.handleToggle} />
          </div>
          <div className={theme.title}>Mercados</div>
        </div>
      </div>
    );
  }
}

export default SideDrawer;
