import React, {Component} from 'react';
import {Table,TableBody,TableFooter,TableRow,TableRowColumn} from 'material-ui/Table';
import './../Trades/Trades.css';

const bodyStyle = {
    overflow: 'hidden'
};

class TableOrders extends Component {
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
        height: '440px',
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
    console.log('JSOOON: '+JSON.stringify(this.state.tableData));
    return (

      <div >
        <Table className="trades-table" bodyStyle={bodyStyle}
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
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
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>BTC MONTO</TableRowColumn>
              <TableRowColumn>MXN PRECIO</TableRowColumn>
            </TableRow>

          </TableFooter>
        </Table>


      </div>
    );
  }
}
export default  TableOrders;
