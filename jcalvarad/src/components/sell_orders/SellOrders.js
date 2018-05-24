import React, { Component } from "react";
import Table from "react-toolbox/lib/table/Table";
import TableHead from "react-toolbox/lib/table/TableHead";
import TableRow from "react-toolbox/lib/table/TableRow";
import TableCell from "react-toolbox/lib/table/TableCell";
import theme from "./SellOrders.module.css";

class SellOrders extends Component {
  render() {
    const themeAll = { ...theme, ...this.props.theme };
    return (
      <div>
        <div className={themeAll.header}>POSTURAS DE VENTA</div>
        <Table theme={themeAll} selectable={false}>
          <TableHead>
            <TableCell>MXN PRECIO</TableCell>
            <TableCell>MXN VALOR</TableCell>
            <TableCell>BTC MONTO</TableCell>
            <TableCell>SUM</TableCell>
            <TableCell> </TableCell>
          </TableHead>
          {this.props.orders.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell numeric>
                <div className={themeAll["rate-sell"]}>{item.rate}</div>
              </TableCell>
              <TableCell numeric>{item.value}</TableCell>
              <TableCell numeric>{item.amount}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}

export default SellOrders;
