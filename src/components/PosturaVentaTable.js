import React, { Component } from 'react'
import TableComponent from './table/TableComponent'

class PosturaVentaTable extends Component {
	render() {
		const tableConfigFields = [
		{
			pretitle: 'MXN',
			title: 'PRECIO',
			type: "number",
			classColumn: "red",
			dataIndex: 'r'
		},{
			pretitle: 'MXN',
			title: 'VALOR',
			type: "number",
			dataIndex: 'v'
		},{
			pretitle: 'MXN',
			title: 'MONTO',
			type: "zeros",
			dataIndex: 'a'
		},{
			title: 'SUM',
			type: "number",
			dataIndex: 'sum'
		},{
			title: 'space',
			type: "bar",
			dataIndex: "percent"
		}];
		//console.log("Render PosturaVentaTable", this.props);
		return (
			<TableComponent title="POSTURAS DE VENTA" fields={tableConfigFields} data={this.props.asks} keyDataIndex="o" idTable="asks" />			
		);
   }
}
export default PosturaVentaTable