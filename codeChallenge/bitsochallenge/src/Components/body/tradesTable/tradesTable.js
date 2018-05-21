import React, {Component} from 'react';
import {Table,TableBody,TableFooter,TableRow,TableRowColumn} from 'material-ui/Table';
import './../Trades/Trades.css';

const bodyStyle = {
    overflow: 'hidden'
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
        height: '440px',


        //this.setState({tableData:props.tradesArray.map()})
      }


    }
/***Controllers for table property, it could be customizable***/
  componentWillMount(){

  }
  componentDidUpdate(){
    var tableData =JSON.stringify(this.props.tableData);

    // {this.props.tableData.map(trade => {
    //                   //  console.log(trade.created_at.substring(11,19))
    //                   //  console.log(trade.price)
    //                       //console.log(trade.amount)
    //
    //         //this.setState({tableData:trade})
    //         })}

  }
  componentDidMount(){

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
