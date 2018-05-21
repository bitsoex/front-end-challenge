import React, { Component } from "react";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import bitso_logo from "../assets/Images/SVG/bitso_logo.svg";
// import sun_icon from "../assets/Images/SVG/sun-fill.svg";

const exSubmenu = ["Trading", "Resumen", "Live Trades", "Posturas"];
const user = ["Perfil", "Salir"];

class NavbarHeader extends Component {
  render() {
    return (
      <header className="navbar-header">
        <div className="header-container">
          <div style={{ display: "flex", flex: 1 }}>
            <img src={bitso_logo} className="navbar__App-logo" alt="logo" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
                marginLeft: "3rem",
                borderRight: "0.5px solid #b0bac1"
              }}
            >
              <span
                style={{
                  paddingLeft: "3rem",
                  borderLeft: "0.5px solid #b0bac1"
                }}
              >
                EXCHANGE
              </span>
              <span style={{ paddingRight: "4rem" }}>
                1 BTC = 000,000.00 MXN
              </span>
            </div>
          </div>
          <div
            style={{
              width: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginLeft: "2rem",
              marginRight: "3rem"
            }}
          >
            <Menu
              mode="horizontal"
              className="header__menu-item"
              // onSelect={book => this.handleSelect(book.key)}
            >
              <SubMenu
                className="header__menu-item"
                key="wallet"
                title="Wallet"
                onTitleClick={() => console.log("Wallet")}
              />
            </Menu>
            <Menu
              mode="horizontal"
              className="header__menu-item"
              // onSelect={book => this.handleSelect(book.key)}
            >
              <SubMenu
                className="header__menu-item"
                key="exchange"
                title="Exchange"
                onTitleClick={() => console.log("Exchange")}
              >
                {exSubmenu.map(item => (
                  <MenuItem key={item}>
                    <div style={{ paddingRight: 50 }}>
                      <span>{item}</span>
                    </div>
                  </MenuItem>
                ))}
              </SubMenu>
            </Menu>
            <span className="header__button-item">Ayuda</span>
            <div className="div_block_content-profile">
              <div className="div_block-circle">
                <div className="div_block-circle in-circle">
                  <div className="div_block-circle in__in-circle" />
                </div>
              </div>
              <Menu
                mode="horizontal"
                className="header__menu-item"
                // onSelect={book => this.handleSelect(book.key)}
              >
                <SubMenu
                  className="header__menu-item"
                  key="user"
                  title="Usuario"
                  onTitleClick={() => console.log("Usuario")}
                >
                  {user.map(item => (
                    <MenuItem key={item}>
                      <div style={{ paddingRight: 50 }}>
                        <span>{item}</span>
                      </div>
                    </MenuItem>
                  ))}
                </SubMenu>
              </Menu>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </header>
    );
  }
}

export default NavbarHeader;
