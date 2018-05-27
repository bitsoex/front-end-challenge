import React, { Component } from 'react'
import TableComponent from './table/TableComponent'

class AsksTable extends Component {
	render() {
		const tableConfigFields = [
		{
			pretitle: 'TO',
			title: 'PRECIO',
			type: "number",
			classColumn: "red",
			dataIndex: 'r'
		},{
			pretitle: 'TO',
			title: 'VALOR',
			type: "number",

			dataIndex: 'v'
		},{
			pretitle: 'FROM',
			title: 'MONTO',
			type: "zeros",

			dataIndex: 'a'
		},{
			title: 'SUM',
			type: "number",
			classHeader: "sum",
			dataIndex: 'sum'
		},{
			title: '',
			type: "bar",
			classHeader: "graph",
			dataIndex: "percent"
		}];
		return (
			<TableComponent title="POSTURAS DE VENTA" fields={tableConfigFields} data={this.props.asks} keyDataIndex="o" idTable="asks" bookSelected={this.props.bookSelected} />			
		);
   }
}
export default AsksTable