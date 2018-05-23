import React, { Component } from 'react'
import {formatCurrency} from '../../util/formatNumbers'

const NDECIMALS = 8;

function BodyTable(props) {
		const data = props.data ? props.data: [];
		const fields = props.fields;
		const keyDataIndex = props.keyDataIndex;
		const idTable = props.idTable;
		//console.log("render BodyTable=" + idTable);
		const listItems = data.map((rowData, index) =>{
			
			const key = rowData[keyDataIndex] + "_" + idTable;
			const listFieldRow = fields.map((fieldInfo, indexField)=>{
			
				const value = fieldInfo.dataIndex ? rowData[fieldInfo.dataIndex] : rowData[indexField];
				const classColumn = fieldInfo.classColumn ? fieldInfo.classColumn : '';
				const keyField = key + "_field" + fieldInfo.dataIndex;
				if(fieldInfo.type == 'number')
					return (<td key={keyField} className={classColumn}>{formatCurrency(value, true)}</td>);
				else
					if(fieldInfo.type == 'zeros'){
						const number =  parseFloat(value);
						const numberWithZeros = number.toFixed(NDECIMALS);
						const numberString = number.toString();
						const zeros = numberWithZeros.slice(numberString.length)
						return (<td key={keyField} className="amount">{number}<span className="zeros">{zeros}</span></td>);
					}
				return(
					<td key={keyField} className={classColumn}>{value}</td>
				);
			});
			const classActive = rowData.active ? "active" : "";
			//const classActive = index ? "" : "active";
			//var rate = parseFloat(rowData.r);
			//if (rowData.t == 0 && price < rate || rowData.t == 1 && price > rate)
				
			return (
				<tr key={key} className={classActive}> 
					{listFieldRow}
				</tr>
			);
			
		});
	  
		return (
			<tbody>{listItems}</tbody>
		);
}


function HeaderColumn(props) {
	
	const listItems = props.fields.map((rowData, index) =>{
		const title = rowData.title;
		const pretitle = rowData.pretitle;
		const key = rowData.dataIndex;
		return (
			<td key={key}>
				<span className="label">{pretitle}</span>
				<span>{title}</span>
			</td>
		);
	});
	
	return (
		<tr>
			{listItems}
		</tr>
	);
}

//function TableComponent(props){
class TableComponent extends React.Component {
	
	/*constructor(props) {
		super(props);
		this.state = {obs$: new ()};
	 }*/

	
	componentDidMount() {

	}

	componentWillUnmount() {

	}
	
	render(){
		const props = this.props;
		const ncolumns = props.fields ? props.fields.length : 1;
		const title = props.title ? props.title : 'TableComponent';
		const fields = props.fields ? props.fields : [];
		const data = props.data ? props.data : [];
		const keyDataIndex = props.keyDataIndex;
		const idTable = props.idTable;
		return (
			<table className={idTable}>
				<thead>
					<tr>
						<th colSpan={ncolumns} className="block">
							{title}
						</th>
					</tr>
					<HeaderColumn fields={props.fields} />
				</thead>
				<BodyTable data={data} fields={fields} keyDataIndex={keyDataIndex} idTable={idTable}/>
			</table>
		);
	}
}

export default TableComponent;