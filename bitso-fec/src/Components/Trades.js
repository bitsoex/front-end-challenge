import React from "react";
import moment from "moment";
import { formatNumber } from "../Utils";

/**
 * Trades table component for recent trades from the specified book.
 * @param {Array<String>} round Ceros to round out number for lighting text
 * @param {string} values Split book to get coin values
 * @param {Number} integer Number to be lighted
 */

const round = ["0", "0", "0", "0", "0", "0", "0", "0"];

class Trades extends React.Component {
  render() {
    const { trades, book } = this.props;
    const values = book.split("_");
    return (
      <div className="dashboard-trades">
        <div className="dashboard__navy-header trades">
          <h4 className="lighter-text bold">ÚLTIMOS TRADES</h4>
        </div>
        <div className="dashboard-trades__table">
          <table>
            <thead>
              <tr>
                <th>HORA</th>
                <th>
                  {values[1].toUpperCase()}
                  <span className="light--text"> PRECIO</span>
                </th>
                <th>
                  {values[0].toUpperCase()}
                  <span className="light--text"> MONTO</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {trades &&
                trades.map(trade => {
                  const { created_at, price, amount, tid, maker_side } = trade;
                  const integer = Number(amount)
                    .toString()
                    .split(".");
                  return (
                    <tr key={tid} className="trade-row">
                      <td className="lighting-text">
                        {moment(created_at).format("H:mm:ss")}
                      </td>
                      <td
                        className={
                          maker_side === "buy"
                            ? "color-bid__trades"
                            : "color-ask__trades"
                        }
                      >
                        {formatNumber(values, price)}
                      </td>
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
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Trades;
