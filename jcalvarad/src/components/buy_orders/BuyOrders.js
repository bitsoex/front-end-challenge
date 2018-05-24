import React, { Component } from "react";
import Table from "react-toolbox/lib/table/Table";
import TableHead from "react-toolbox/lib/table/TableHead";
import TableRow from "react-toolbox/lib/table/TableRow";
import TableCell from "react-toolbox/lib/table/TableCell";
import theme from "./BuyOrders.module.css";

class BuyOrders extends Component {
  render() {
    const themeAll = { ...theme, ...this.props.theme };
    return (
      <div>
        <div className={themeAll.header}>POSTURAS DE COMPRA</div>
        <Table theme={themeAll} selectable={false}>
          <TableHead>
            <TableCell> </TableCell>
            <TableCell>SUM</TableCell>
            <TableCell>BTC MONTO</TableCell>
            <TableCell>MXN VALOR</TableCell>
            <TableCell>MXN PRECIO</TableCell>
          </TableHead>
          {this.props.orders.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell />
              <TableCell />
              <TableCell numeric>{item.amount}</TableCell>
              <TableCell numeric>{item.value}</TableCell>
              <TableCell numeric>
                <div className={themeAll["rate-buy"]}>{item.rate}</div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}

export default BuyOrders;
