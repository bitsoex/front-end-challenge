import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import _ from "lodash";
import { formatNumber } from "../Utils";
import Loading from "./Loading";
/**
 * Trades table component for recent trades from the specified book.
 * @param {Array<String>} round Ceros to round out number for price and value
 * @param {Array<Object>} orders first orders and diff-orders parsed
 * @param {string} book Active book
 * @param {string} type Specifies the style of the table
 * @param {number} biggestAmount Get biggest amount for the orders
 * @param {number} width Get percentage depending on biggestAmount and amount for each order
 * @param {number} integer Number to be lighted
 */

const round = ["0", "0", "0", "0", "0", "0", "0", "0"];

export default ({ orders, book, type }) => {
  const values = book.split("_");
  const biggestAmount =
    orders && orders.length && _.maxBy(orders, "amount").amount;
  return (
    <table className={type === "bids" ? "reverse" : null}>
      <thead>
        <tr>
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
      {!orders ? (
        /* Loading placeholder for order tables */
        <Loading rows={12} />
      ) : (
        /* TransitionGroup animation for cancelled, completed or open orders */
        <TransitionGroup component="tbody" className="content">
          {orders.map(order => {
            const { price, amount, sum, value, oid } = order;
            let width = amount / biggestAmount * 100;
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
                  <td className="order-value">{formatNumber(values, value)}</td>
                  <td
                    className={
                      type === "bids"
                        ? "color-bid__orders"
                        : "color-ask__orders"
                    }
                  >
                    {formatNumber(values, price)}
                  </td>
                </tr>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </table>
  );
};
