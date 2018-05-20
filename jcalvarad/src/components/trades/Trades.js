import React, { Component } from 'react';
import Table from 'react-toolbox/lib/table/Table';
import TableHead from 'react-toolbox/lib/table/TableHead';
import TableRow from 'react-toolbox/lib/table/TableRow';
import TableCell from 'react-toolbox/lib/table/TableCell';

class Trades extends Component {

    render() {
        return (
            <Table selectable={false}>
                <TableHead>
                    <TableCell>Hora</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Monto</TableCell>
                </TableHead>
                {this.props.trades.map((item, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{item.time}</TableCell>
                        <TableCell numeric>{item.rate}</TableCell>
                        <TableCell numeric>{item.amount}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}

export default Trades;