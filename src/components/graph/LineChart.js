import React, {Component} from "react"
import { Observable, BehaviorSubject  } from 'rxjs'
import logoA from '../../assets/images/1x/icon_deep.png';
import logoDown from '../../assets/images/1x/icon_dropdown.png';
var ReactDOM = require('react-dom')


var subject = new BehaviorSubject(null);
var observer =  Observable.timer(300)
	.merge(
		subject,
		Observable.fromEvent(window, 'resize')
	)
	.debounceTime(100);
	
	
class LineChartGraph extends React.Component {
	// GET MAX & MIN X
	getMinX() {
		const {data, axisXIndex, axisYIndex} = this.props;
		return data[0][axisXIndex];
	}
	getMaxX() {
		const {data, axisXIndex, axisYIndex} = this.props;
		return data[data.length - 1][axisXIndex];
	}
	// GET MAX & MIN Y
	getMinY() {
		const {data, axisXIndex, axisYIndex} = this.props;
		return data.reduce((min, p) => p[axisYIndex] < min ? p[axisYIndex] : min, data[0][axisYIndex]);
	}
	getMaxY() {
		const {data, axisXIndex, axisYIndex} = this.props;
		return data.reduce((max, p) => p[axisYIndex] > max ? p[axisYIndex] : max, data[0][axisYIndex]);
	}
	
	// GET SVG COORDINATES
	getSvgX(x, posX, widthMax) {
		const {axisXIndex, axisYIndex} = this.props;
		return  posX + (((x -this.getMinX()) * widthMax) / (this.getMaxX() - this.getMinX()));
	}
	getSvgY(y, posY, heightMax) {
		const {axisXIndex, axisYIndex} = this.props;
		return posY + (heightMax - (y / this.getMaxY() * heightMax));
	}
	
	// BUILD SVG PATH
	makeFill(posX, posY, widthMax, heightMax) {
		const { axisXIndex, axisYIndex, data} = this.props;
		if(data.length == 0)
			return(
					<polygon className="linechart_fill_empty" /> 
				)
		let pathD = posX+ " " + heightMax + " " +  this.getSvgX(data[0][axisXIndex], posX, widthMax) + " " + this.getSvgY(data[0][axisYIndex], posY, heightMax) + " ";
		let lastY = this.getSvgY(data[0][axisYIndex], posY, heightMax);
		data.map((point, i) => {
			let actualY = lastY;
			lastY = this.getSvgY(point[axisYIndex], posY, heightMax);
			pathD+= this.getSvgX(point[axisXIndex], posX, widthMax) + " " +actualY + " " + this.getSvgX(point[axisXIndex], posX, widthMax) + " " + this.getSvgY(point[axisYIndex], posY, heightMax) + " ";
		});

		pathD += widthMax + " " + heightMax;
		return (
		 <polygon className="linechart_fill" points={pathD}/>
		 
		);
	} 

	makePath(posX, posY, widthMax, heightMax) {
		const {data, axisXIndex, axisYIndex} = this.props;
		if(data.length == 0)
			return(
				<path className="linechart_path_empty" /> 
			)
		let pathD = "M " + this.getSvgX(data[0][axisXIndex], posX, widthMax) + " " + this.getSvgY(data[0][axisYIndex], posY, heightMax) + " ";
		let lastY = this.getSvgY(data[0][axisYIndex], posY, heightMax);
		pathD += data.map((point, i) => {
			let actualY = lastY;
			lastY = this.getSvgY(point[axisYIndex], posY, heightMax);
			return ("L " + this.getSvgX(point[axisXIndex], posX, widthMax) + " " +actualY + " ") + "L " + this.getSvgX(point[axisXIndex], posX, widthMax) + " " + this.getSvgY(point[axisYIndex], posY, heightMax) + " ";
		});

		pathD+= "L " + this.getSvgX(this.getMaxX(), posX, widthMax) + " " + heightMax;
		return (
		  <path className="linechart_path" d={pathD} /> 
		);
	}
	// BUILD GRID AXIS
	makeAxis(posX, widthMax, heightMax) {
		const {data} = this.props;
		if(data.length == 0)
			return(
				<path className="linechart_path_empty" /> 
			)
		const minX = this.getMinX(), maxX = this.getMaxX();
		const minY = this.getMinY(), maxY = this.getMaxY();
		const step = widthMax/3;
		const stepValue = (maxX - minX)/4;
		
		var rows = [];
		let value = minX ;
		for (var i = 0; i < 4; i++) {
			let valueInt = parseInt(value);
			rows.push(
				<text y={20} transform={`translate(${step*i})`}>
					<tspan x="0" textAnchor="middle" className="text_axis">{value.toFixed(2)}</tspan>
				</text>
				);
			rows.push(
				<line x1={step*i} y1="20" x2={step*i} y2={heightMax+20} className="axis" />
			);
			value = value + stepValue;
		}

		return (rows);
	}
	
	render(){
		const {id, data, asks, posx, posy, width, height} = this.props;
		const transform = {translate:`'(${posx})'`}
		return(
			<g id={id} transform={`translate(${posx}, ${posy})`}>
				{this.makeAxis(0 , width, height-30)}
				<g transform={`translate(0, ${posy+30})`}>
					{this.makeFill(0 , 0, width, height-30)}
					{this.makePath(0 , 0, width, height-30)}
				</g>
			</g>
			
		);
	}
}

LineChartGraph.defaultProps = {
	id: '',
	data: [],
	svgHeight: 300,
	svgWidth: 700,
	posx: 0,
	posy: 0,
	axisXIndex: 'r',
	axisYIndex: 'sum'
}


class LineChart extends React.Component {

	//{this.makeAxis()}
	render() {
		const {svgHeight, svgWidth, bids, asks} = this.props;
		const distance_between = 70;
		let svgHeightWitoutHeader = svgHeight - 30;
		console.log("render.LineChart", this.props);
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph">
								<img src={logoA} />
								<img src={logoDown} />
							</div>
						</li>
					</ul>
				</div>
				<div className="graps">
					<svg viewBox={`0 0 ${svgWidth} ${svgHeightWitoutHeader}`}>
						<text y={svgHeightWitoutHeader/2} transform={`translate(${svgWidth/2})`}>
							<tspan x="0" textAnchor="middle" className="text">9,048.7 MXN</tspan>
							<tspan x="0" textAnchor="middle" className="text2" dy="15">0.49% spread</tspan>
						</text>
						<LineChartGraph id="bids" data={bids} posx={0} posy={0} width={svgWidth/2 - distance_between} height={svgHeightWitoutHeader} />
						<LineChartGraph id="asks" data={asks} posx={svgWidth/2+distance_between} posy={0} width={svgWidth/2-distance_between} height={svgHeightWitoutHeader} />
					</svg>
				</div>
			</div>
		);
	}
}
// DEFAULT PROPS
LineChart.defaultProps = {
  bids: [],
  asks: [],
  svgHeight: 300,
  svgWidth: 700
}

class ChartToRender extends React.Component{
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
			//console.log("resize window!!!");
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



export default ChartToRender;