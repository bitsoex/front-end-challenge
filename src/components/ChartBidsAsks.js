import React from 'react'
import { Observable, BehaviorSubject  } from 'rxjs'
import ReactDOM from 'react-dom';

import LineChart from './chart/LineChart'
import StockChart from './chart/StockChart'

/**
* 	Observer if the windows resize
*/
var subject = new BehaviorSubject(null);
var observer =  Observable.timer(300)
	.merge(
		subject,
		Observable.fromEvent(window, 'resize')
	)
	.debounceTime(100);

class ChartBidsAsks extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			widthParent: 300,
			heightParent: 700,
			showDefaultGraph: false
		};
	}
	
	componentDidMount() {
		this.element = ReactDOM.findDOMNode( this );
		observer.subscribe((event) => {
			this.setPointerLocation( this.element.clientWidth ,this.element.clientHeight);
		});
	}
	
	componentWillUnmount() {
		observer.unsubscribe();
	}
	
	changeGraph(){
		this.setState({
			showDefaultGraph: !this.state.showDefaultGraph
		});
	}
	
	render() {
		const {bids, asks, bookSelected, historytrades, changePeriodInterval} = this.props;
		//console.log("wtf",this.props);
		return(
			<ResizeDirective >
				{this.state.showDefaultGraph ? 
					(<LineChart bids={bids} asks={asks} svgWidth={this.state.widthParent}  svgHeight={this.state.heightParent} changeGraph={this.changeGraph.bind(this)}/>)
					:
					(<StockChart bookSelected={bookSelected} historytrades={historytrades} changeGraph={this.changeGraph.bind(this)} changePeriodInterval={changePeriodInterval} svgWidth={this.state.widthParent}  svgHeight={this.state.heightParent} />)
				}
			</ResizeDirective>
		);
	}
	setPointerLocation( width, height ) {
		this.setState({
			widthParent: width,
			heightParent: height
		});
	}
}
		
 class ResizeDirective extends React.Component{
	propTypes: {
		children: React.PropTypes.element.isRequired,
		setPointerLocation: React.PropTypes.func.isRequired
	}

	render() {
		return( this.props.children );
	}
}



export default ChartBidsAsks;