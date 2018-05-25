
import React from 'react';
import { render } from 'react-dom';
import Chart from './ChartHeiki';
import {getBook} from './../../../Utils/getBookHistory.js';
import { TypeChooser } from "react-stockcharts/lib/helper";

const styles={
	display: "inline",
	width:949
}
class ChartComponent extends React.Component {
	componentDidMount() {
		getBook(this.props.period).then(data => {
			this.setState({ data })
		})
	}
	componentWillReceiveProps(nextProps){
		getBook(nextProps.period).then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
				<Chart type="svg" data={this.state.data} width='949' style={styles} />
		)
	}
}
export default ChartComponent;
