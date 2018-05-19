import React from "react";
import numeral from "numeral";
import moment from "moment";

const round = ["0", "0", "0", "0", "0", "0", "0", "0"];

class Trades extends React.Component {
  render() {
    const { trades, book } = this.props;
    const values = book.split("_");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          flex: "0 0 22%"
        }}
      >
        <div className="navy-header trades">
          <h4 className="lighter-text bold">ÚLTIMOS TRADES</h4>
        </div>
        <div
          style={{
            flex: 1,
            marginRight: "10px",
            display: "flex",
            fontSize: "1.35rem"
          }}
        >
          <table>
            <thead>
              <tr className="fixed">
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
            <tbody className="trades">
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
                        {values[1] !== "mxn"
                          ? numeral(price).format("0.00000000")
                          : numeral(price).format("$0,0.00")}
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
