import React, {Component} from 'react';
import {Table,TableBody,TableHeader, TableFooter,TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import './../Trades/Trades.css';

const bodyStyle = {
    overflow: 'hidden',
    height: 518,
};

class TableTrades extends Component {
  constructor(props) {
      super(props);
      this.state={
        tableData:[],
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        displaySelectAll:false,
        overflow: 'hidden',
        height: '440px',
        mxn:'MXN',
        coinSelected:'BTC',
      }
    }
  componentDidUpdate(){
    var tableData =JSON.stringify(this.props.tableData);
  }
  static defaultProps = {
    tradesArray:{},
  }
  render() {
    return (
      <div >
        <Table className="trades-table" bodyStyle={bodyStyle}
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
        <TableHeader
          displaySelectAll={this.state.displaySelectAll}
          overflow={this.state.overflow}>
          <TableRow>
            <TableHeaderColumn>Hora</TableHeaderColumn>
            <TableHeaderColumn><span className='coin'>{this.state.mxn}</span> Precio</TableHeaderColumn>
            <TableHeaderColumn><span className='coin'>{this.state.coinSelected}</span> Monto</TableHeaderColumn>
          </TableRow>
        </TableHeader>
          <TableBody id="tablaData" className="trades-table" style="overflow-y:hidden"
            displayRowCheckbox={false}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.tableData.map( (row, index) => (
              <TableRow key={index} className={row.maker_side==='buy'?' tradeBuy':'tradeSell'}>
                <TableRowColumn >{row.created_at.substring(11,19)}</TableRowColumn>
                <TableRowColumn>{row.price}</TableRowColumn>
                <TableRowColumn>{row.amount}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>Hora</TableRowColumn>
              <TableRowColumn>Precio</TableRowColumn>
              <TableRowColumn>Monto</TableRowColumn>
            </TableRow>

          </TableFooter>
        </Table>


      </div>
    );
  }
}
export default  TableTrades;
