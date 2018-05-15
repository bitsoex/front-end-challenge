import React, { Component } from "react";
import ExchangeContext from "../Contexts/ExchangeContext";
import Table from "./Table";

class Orders extends Component {
  render() {
    return (
      <ExchangeContext.Consumer>
        {({ orders, book }) => {
          return (
            <div className="div-block__content">
              <div>
                <div className="header__orders">
                  <h3>POSTURAS DE COMPRA</h3>
                </div>
                <Table
                  orders={orders && orders.asks}
                  book={book}
                  type={"asks"}
                />
              </div>
              <div>
                <h3>POSTURAS DE VENTA</h3>
                <Table
                  orders={orders && orders.bids}
                  book={book}
                  type={"bids"}
                />
              </div>
            </div>
          );
        }}
      </ExchangeContext.Consumer>
    );
  }
}

export default Orders;
