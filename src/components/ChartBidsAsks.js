import React from 'react'
import { Observable, BehaviorSubject  } from 'rxjs'
import ReactDOM from 'react-dom';

import LineChart from './chart/LineChart'

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
			heightParent: 700
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
	
	render() {
		const {bids, asks} = this.props;

		return(
			<ResizeDirective >
			   <LineChart bids={bids} asks={asks} svgWidth={this.state.widthParent}  svgHeight={this.state.heightParent}/>
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