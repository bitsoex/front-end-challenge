import React, {Component} from 'react';
import {Table,TableBody,TableHeader, TableFooter,TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import './../Trades/Trades.css';
import './orders.css';

const bodyStyle = {
    overflow: 'hidden',

};
const headerStyle={
  overflow: 'hidden',
}

class TableOrdersAsks extends Component {
  constructor(props) {
      super(props);
      this.state={
        tableData:[],
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: true,
        adjustForCheckbox: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        displaySelectAll:false,
        overflow: 'hidden',
        height: '440px',
        mxn:"MXN",
        coinSelected:"BTC"
      }
    }
    componentDidUpdate(){
      var tableData =JSON.stringify(this.props.tableData);

    }
    static defaultProps = {
      tradesArray:{},
    }
  render() {
    if (this.props.tableData==null){
      return (
        <div>Loading</div>
      )
    }
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
            <TableHeaderColumn><span className='coin'>{this.state.mxn}</span>Monto</TableHeaderColumn>
            <TableHeaderColumn><span className='coin'>{this.state.coinSelected}</span>Precio</TableHeaderColumn>
            <TableHeaderColumn><span className='coin'>{this.state.coinSelected}</span>Valor</TableHeaderColumn>
          </TableRow>
        </TableHeader>
          <TableBody id="tablaData" className="trades-table" style="overflow-y:hidden"
            displayRowCheckbox={false}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.tableData.payload.asks.map( (row, index) => (
              <TableRow key={index} >
                <TableRowColumn>{row.amount}</TableRowColumn>
                <TableRowColumn className={'tradeSell'}>{row.price}</TableRowColumn>
                <TableRowColumn >{row.price*row.amount}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>BTC MONTO</TableRowColumn>
              <TableRowColumn>MXN PRECIO</TableRowColumn>
              <TableRowColumn>MXN VALOR</TableRowColumn>

            </TableRow>

          </TableFooter>
        </Table>


      </div>
    );
  }
}

export default TableOrdersAsks;
