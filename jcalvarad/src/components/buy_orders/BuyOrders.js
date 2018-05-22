import React, { Component } from 'react';
import Table from 'react-toolbox/lib/table/Table';
import TableHead from 'react-toolbox/lib/table/TableHead';
import TableRow from 'react-toolbox/lib/table/TableRow';
import TableCell from 'react-toolbox/lib/table/TableCell';
import theme from './Trades.module.css';

class BuyOrders extends Component {

    render() {
        const themeAll = {...theme,...this.props.theme};
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
                    {this.props.trades.map((item, idx) => (

                        <TableRow key={idx}>
                            <TableCell>{item.time}</TableCell>
                            <TableCell numeric>
                                <div className={theme['rate-buy']}>{item.rate}</div>
                            </TableCell>
                            <TableCell numeric>{item.amount}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        );
    }
}

export default BuyOrders;