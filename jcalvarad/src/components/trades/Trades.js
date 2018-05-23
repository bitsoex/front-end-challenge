import React, { Component } from "react";
import Table from "react-toolbox/lib/table/Table";
import TableHead from "react-toolbox/lib/table/TableHead";
import TableRow from "react-toolbox/lib/table/TableRow";
import TableCell from "react-toolbox/lib/table/TableCell";
import theme from "./Trades.module.css";

class Trades extends Component {
  render() {
    const themeAll = { ...theme, ...this.props.theme };
    return (
      <div>
        <div className={themeAll.header}>ÚLTIMOS TRADES</div>
        <Table theme={themeAll} selectable={false}>
          <TableHead>
            <TableCell>HORA</TableCell>
            <TableCell>MXN PRECIO</TableCell>
            <TableCell>BTC MONTO</TableCell>
          </TableHead>
          {this.props.trades.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.time}</TableCell>
              <TableCell numeric>
                <div className={item.marker ? theme["rate-sell"] : theme["rate-buy"]}>{item.rate}</div>
              </TableCell>
              <TableCell numeric>{item.amount}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}

export default Trades;
