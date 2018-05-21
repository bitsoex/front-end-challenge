import React,{Component} from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"
import { TypeChooser } from "react-stockcharts/lib/helper";


class Candlestick extends Component {
	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<Chart type="svg" data={this.state.data} className="chartContent" width="949" />
			//<Chart type="svg" data={this.props.dataChart} className="chartContent" width="949" />

		)
	}
}

export default Candlestick;
