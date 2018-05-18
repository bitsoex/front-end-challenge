import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import numeral from "numeral";
import _ from "lodash";

const round = ["0", "0", "0", "0", "0", "0", "0", "0"];

export default ({ orders, book, type }) => {
  const values = book.split("_");
  const biggestAmount =
    orders && orders.length && _.maxBy(orders, "amount").amount;
  // console.log(orders, biggestAmount)
  return (
    <table className={type === "bids" ? "reverse" : null}>
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
      <TransitionGroup component="tbody" className="content">
        {orders &&
          orders.map(order => {
            const { price, amount, sum, value, oid } = order;
            let width = amount / biggestAmount * 100;
            // console.log(amount, biggestAmount);
            const integer = Number(amount)
              .toString()
              .split(".");
            if (width < 5) {
              width = 1.5;
            } else if (width > 100) {
              width = 100;
            }
            return (
              <CSSTransition
                key={oid}
                timeout={700}
                classNames={type === "bids" ? "bids" : "asks"}
              >
                <tr>
                  <td className="status__bar">
                    <div
                      className={`bar ${
                        type === "bids" ? "bid-color" : "ask-color"
                      }`}
                      style={{
                        width: `${width}%`
                      }}
                    />
                  </td>
                  <td className="lighter-text">{Number(sum).toFixed(2)}</td>
                  <td>
                    <span className="lighter-text">
                      {integer.length > 1
                        ? Number(amount)
                        : `${Number(amount)}.`}
                    </span>
                    {round
                      .slice(
                        0,
                        8 - (integer.length > 1 ? integer[1].length : 0)
                      )
                      .join("")}
                  </td>
                  <td className="order-value">
                    {value < 1
                      ? numeral(value).format("0.00000000")
                      : numeral(value).format("$0,0.00")}
                  </td>
                  <td
                    className={
                      type === "bids"
                        ? "color-bid__orders"
                        : "color-ask__orders"
                    }
                  >
                    {price < 1
                      ? numeral(price).format("0.00000000")
                      : numeral(price).format("$0,0.00")}
                  </td>
                </tr>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </table>
  );
};
