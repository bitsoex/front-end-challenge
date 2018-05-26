import React, {Component} from "react"
import ReactDOM from 'react-dom'
import LineChartGraph from './LineChartGraph'
import logoA from '../../assets/images/1x/icon_candles.png'
import logoB from '../../assets/images/1x/icon_deep.png'
import logoDown from '../../assets/images/1x/icon_dropdown.png'
import selectedIcon from '../../assets/images/1x/order_selector.png'

class LineChart extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { x: 0, y: 0 };
	}
	
	componentDidMount() {
		this.element = ReactDOM.findDOMNode( this );
	}
	
	getOffset(){
		var bound = this.element.getBoundingClientRect();
		var html = document.documentElement;

		return {
			top: bound.top + window.pageYOffset - html.clientTop,
			left: bound.left + window.pageXOffset - html.clientLeft
		};
	}


	_onMouseMove(e) {
		const {top, left} = this.getOffset();
		const {screenX, screenY} = e;
		if(left && top)
			this.setState({ x: screenX - left , y: screenY - top });
	}

	render() {
		const {svgHeight, svgWidth, bids, asks, changeGraph} = this.props;
		const distance_between = 70;
		let svgHeightWitoutHeader = svgHeight - 30;
		//console.log("Render.LineChart", svgHeight, svgHeight-30, svgWidth);
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph " >
								<img src={selectedIcon} />
								<img src={logoA} />
							</div>
							<div className="menu_graph selected"  onClick={e=>changeGraph()}>
								<img src={selectedIcon} style={{opacity:0}}/>
								<img src={logoB} />
							</div>
						</li>
						<li>
						</li>
					</ul>
				</div>
				<div className="graps">
					<svg viewBox={`0 0 ${svgWidth} ${svgHeightWitoutHeader}`} onMouseMove={this._onMouseMove.bind(this)}>
						<text y={svgHeightWitoutHeader/2} transform={`translate(${svgWidth/2})`}>
							<tspan x="0" textAnchor="middle" className="text">9,048.7 MXN</tspan>
							<tspan x="0" textAnchor="middle" className="text2" dy="15">0.49% spread</tspan>
						</text>
						<LineChartGraph id="bids" data={bids} posx={0} posy={0} width={svgWidth/2 - distance_between} height={svgHeightWitoutHeader} mouseX={this.state.x}/>
						<LineChartGraph id="asks" data={asks} posx={svgWidth/2+distance_between} posy={0} width={svgWidth/2-distance_between} height={svgHeightWitoutHeader} mouseX={this.state.x}/>
					</svg>
				</div>
			</div>
		);
	}
}

LineChart.defaultProps = {
  bids: [],
  asks: [],
  svgHeight: 300,
  svgWidth: 700
}

export default LineChart