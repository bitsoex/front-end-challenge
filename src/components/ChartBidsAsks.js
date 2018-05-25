import React from 'react'
import { Observable, BehaviorSubject  } from 'rxjs'
import ReactDOM from 'react-dom'

import LineChart from './chart/LineChart'
import StockChart from './chart/StockChart'

class ChartBidsAsks extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			showDefaultGraph: false
		};
	}
	
	changeGraph(){
		this.setState({
			showDefaultGraph: !this.state.showDefaultGraph
		});
	}

	render() {
		const {bids, asks, widthChart, heightChart, bookSelected, historytrades, changePeriodInterval} = this.props;
		if(this.state.showDefaultGraph)
			return(
			<LineChart bids={bids} asks={asks} svgWidth={widthChart}  svgHeight={heightChart} changeGraph={this.changeGraph.bind(this)}/>
			)
		return(
			<StockChart bookSelected={bookSelected} historytrades={historytrades} changeGraph={this.changeGraph.bind(this)} changePeriodInterval={changePeriodInterval} svgWidth={widthChart}  svgHeight={heightChart} />
		)
	}
	
}
		

export default ChartBidsAsks;