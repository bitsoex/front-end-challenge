import React, { Component } from "react";
import _ from "lodash";
import ExchangeContext from "../Contexts/ExchangeContext";

const round = ["0", "0", "0", "0", "0", "0", "0", "0"];

class Orders extends Component {
  render() {
    return (
      <ExchangeContext.Consumer>
        {({ orders, book }) => {
          const values = book.split("_");
          console.log(orders)
          const biggestAmountAsk =
            orders && _.orderBy(orders.asks, ["amount"], ["desc"])[0].amount;
          const biggestAmountBid =
            orders && _.orderBy(orders.bids, ["amount"], ["desc"])[0].amount;
          return (
            <div className="div-block__content">
              <div>
                <div>
                  <h3>POSTURAS DE COMPRA</h3>
                </div>
                <table>
                  <thead>
                    <tr className="fixed">
                      <th className="status__bar" />
                      <th>SUM</th>
                      <th>
                        {values[0].toUpperCase()}
                        <span className="light--text"> MONTO</span>
                      </th>
                      <th>
                        {values[1].toUpperCase()}
                        <span className="light--text"> VALOR</span>
                      </th>
                      <th>
                        {values[1].toUpperCase()}
                        <span className="light--text"> PRECIO</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="content">
                    {orders &&
                      orders.asks.map((order, index) => {
                        const { price, amount, sum, value } = order;
                        let widthAsk = (amount / biggestAmountAsk) * 100;
                        const integer = Number(amount)
                          .toString()
                          .split(".");
                        if (widthAsk < 1) widthAsk = 1;
                        return (
                          <tr key={index}>
                            <td className="status__bar">
                              <div
                                className="bar ask-color"
                                style={{
                                  width: `${widthAsk}%`
                                }}
                              />
                            </td>
                            <td className="lighter-text">
                              {Number(sum).toFixed(2)}
                            </td>
                            <td>
                              <span className="lighter-text">
                                {Number(amount)}
                              </span>
                              {round
                                .slice(
                                  0,
                                  8 -
                                    (integer.length > 1 ? integer[1].length : 0)
                                )
                                .join("")}
                            </td>
                            <td>{Number(value).toFixed(2)}</td>
                            <td className="color-ask">
                              {Number(price).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div>
                <h3>POSTURAS DE VENTA</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        {values[1].toUpperCase()}
                        <span className="light--text"> PRECIO</span>
                      </th>
                      <th>
                        {values[1].toUpperCase()}
                        <span className="light--text"> VALOR</span>
                      </th>
                      <th>
                        {values[0].toUpperCase()}
                        <span className="light--text"> MONTO</span>
                      </th>
                      <th>SUM</th>
                      <th className="status__bar" />
                    </tr>
                  </thead>
                  <tbody className="content">
                    {orders &&
                      orders.bids.map((order, index) => {
                        const { price, amount, sum, value } = order;
                        let widthBid = (amount / biggestAmountBid) * 100;
                        if (widthBid < 1) widthBid = 1;
                        const integer = Number(amount)
                          .toString()
                          .split(".");
                        return (
                          <tr key={index}>
                            <td className="color-bid">
                              {Number(price).toFixed(2)}
                            </td>
                            <td>{Number(value).toFixed(2)}</td>
                            <td>
                              <span className="lighter-text">
                                {Number(amount)}
                              </span>
                              {round
                                .slice(
                                  0,
                                  8 -
                                  (integer.length > 1 ? integer[1].length : 0)
                                )
                                .join("")}
                            </td>
                            <td className="lighter-text">
                              {Number(sum).toFixed(2)}
                            </td>
                            <td className="status__bar">
                              <div className="status__bar--content">
                                <div
                                  className="bar bid-color"
                                  style={{
                                    width: `${widthBid}%`
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }}
      </ExchangeContext.Consumer>
    );
  }
}

export default Orders;
