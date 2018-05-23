import React, { Component } from 'react'
import TableComponent from './table/TableComponent'

class PosturaCompraTable extends Component {
	render() {
		const tableConfigFields = [
		{
			title: 'space',
			type: "bar",
			dataIndex: "percent"
		},{
			title: 'SUM',
			type: "number",
			dataIndex: 'sum'
		},{
			pretitle: 'MXN',
			title: 'MONTO',
			type: "zeros",
			dataIndex: 'a'
		},{
			pretitle: 'MXN',
			title: 'VALOR',
			type: "number",
			dataIndex: 'v'
		},{
			pretitle: 'MXN',
			title: 'PRECIO',
			type: "number",
			classColumn: "green",
			dataIndex: 'r'
		}];
		//console.log("Render PosturaCompraTable", this.props);
		return (
			<TableComponent title="POSTURAS DE COMPRA" fields={tableConfigFields} data={this.props.bids} keyDataIndex="o" idTable="bids"/>			
		);
   }
}
export default PosturaCompraTable