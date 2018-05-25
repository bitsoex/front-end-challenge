import React, { Component } from 'react'
import {formatCurrency} from '../../util/formatNumbers'

const NDECIMALS = 8;

function BodyTable(props) {
		const data = props.data ? props.data: [];
		const fields = props.fields;
		const keyDataIndex = props.keyDataIndex;
		const idTable = props.idTable;
		const mountTotal = data.reduce((acc,item)=>acc+item.a, 0);
		const exchange = props.bookSelected.split("_");

		const listItems = data.map((rowData, index) =>{
			
			const key = index;
			const listFieldRow = fields.map((fieldInfo, indexField)=>{
			
				const value = fieldInfo.dataIndex ? rowData[fieldInfo.dataIndex] : rowData[indexField];
				const classColumn = fieldInfo.classColumn ? fieldInfo.classColumn : '';
				const keyField = indexField;
				const units = fieldInfo.pretitle == "FROM" ? exchange[0] : exchange[1];
				if(fieldInfo.type == 'number')
					return (<td key={keyField} className={classColumn}>{formatCurrency(value, units, true)}</td>);
				else
					if(fieldInfo.type == 'zeros'){
						const number =  parseFloat(value);
						const numberWithZeros = number.toFixed(NDECIMALS);
						const numberString = number.toString();
						const zeros = numberWithZeros.slice(numberString.length)
						return (<td key={keyField} className="amount">{number}<span className="zeros">{zeros}</span></td>);
					}else
						if(fieldInfo.type == 'bar'){
							let divStyle = {
								width: parseInt(rowData.a * 100 / mountTotal) + "%"
							};
							
							return (<td key={keyField} className="bar"><div style={divStyle}></div></td>);
						}
				return(
					<td key={keyField} className={classColumn}>{value}</td>
				);
			});
			const classActive = rowData.active ? "active" : "";

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
	const exchange = props.bookSelected.split("_");
	const listItems = props.fields.map((rowData, index) =>{
		const title = rowData.title;
		const pretitle = rowData.pretitle;
		const key = rowData.dataIndex;
		const classHeader = rowData.classHeader ? rowData.classHeader : '';
		const units = rowData.pretitle ?  (rowData.pretitle == "FROM" ? exchange[0] : exchange[1]) : '';;
		return (
			<td key={key} className={classHeader}>
				<span className="label">{units}</span>
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

class TableComponent extends React.Component {

	render(){
		const props = this.props;
		const ncolumns = props.fields ? props.fields.length : 1;
		const title = props.title ? props.title : 'TableComponent';
		const fields = props.fields ? props.fields : [];
		const data = props.data ? props.data : [];
		const keyDataIndex = props.keyDataIndex;
		const idTable = props.idTable;
		let bookSelected = props.bookSelected;
		if(!bookSelected)
			return (<div>Loading</div>);
		bookSelected = bookSelected.toUpperCase();
		return (
			<table className={idTable}>
				<thead>
					<tr>
						<th colSpan={ncolumns} className="block">
							{title}
						</th>
					</tr>
					<HeaderColumn fields={props.fields} bookSelected={bookSelected} />
				</thead>
				<BodyTable data={data} fields={fields} keyDataIndex={keyDataIndex} idTable={idTable} bookSelected={bookSelected}/>
			</table>
		);
	}
}

export default TableComponent;