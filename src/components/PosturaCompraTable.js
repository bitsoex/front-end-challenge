import React, { Component } from 'react'
import TableComponent from './table/TableComponent'

class PosturaCompraTable extends Component {
	render() {
		const tableConfigFields = [
		{
			title: '',
			type: "bar",
			classHeader: "graph",
			dataIndex: "percent"
		},{
			title: 'SUM',
			type: "number",
			classHeader: "sum",
			dataIndex: 'sum'
		},{
			pretitle: 'FROM',
			title: 'MONTO',
			type: "zeros",
			dataIndex: 'a'
		},{
			pretitle: 'TO',
			title: 'VALOR',
			type: "number",
			dataIndex: 'v'
		},{
			pretitle: 'TO',
			title: 'PRECIO',
			type: "number",
			classColumn: "green",
			dataIndex: 'r'
		}];
		//console.log("Render PosturaCompraTable", this.props);
		return (
			<TableComponent title="POSTURAS DE COMPRA" fields={tableConfigFields} data={this.props.bids} keyDataIndex="o" idTable="bids" bookSelected={this.props.bookSelected}/>			
		);
   }
}
export default PosturaCompraTable