import React, {Component} from "react"
import ReactDOM from 'react-dom'
import StockChartGraph from './StockChartGraph'
import DropDown from '../dropdown/DropDown'
import logoA from '../../assets/images/1x/icon_candles.png'
import logoB from '../../assets/images/1x/icon_deep.png'
import logoDown from '../../assets/images/1x/icon_dropdown.png'
import selectedIcon from '../../assets/images/1x/order_selector.png'
const PERIODS = [{
		value:"1month",
		label: "1 Mes",
	},{
		value:"3months",
		label: "3 Meses"
	},{
		value: "1year",
	label: "1 Año"
}];

class StockChart extends React.Component {
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
		const {svgHeight, svgWidth, bookSelected, data, changeGraph, changePeriodInterval} = this.props;
		//console.log("Render StockChart", data, this.props);
		let svgHeightWitoutHeader = svgHeight - 30;
		if(svgHeightWitoutHeader <= 0)
			return(<span>Loading StockChart</span>);
		
		const itemsMenu = PERIODS.map(period => {
			return {
				label: period.label,
				value: bookSelected,
				previousValue: period.value,
				action: changePeriodInterval
			}
		});
		/*onClick={e=>changeGraph()}*/
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph selected" onClick={e=>changeGraph()}>
								<img src={selectedIcon} style={{opacity:0}}/>
								<img src={logoA} />
							</div>
							<div className="menu_graph">
								<img src={selectedIcon} />
								<img src={logoB} />
							</div>
						</li>
						<li className="vcenter ">
						</li>
						<li className="vcenter ">
							<span className="labelItem">Periodo</span>
							<DropDown items={itemsMenu}>
								<div className="menu_graph">
									1 Mes
									<img src={logoDown} />
								</div>
							</DropDown>
						</li>
					</ul>
				</div>
				<div className="graps">
					<svg viewBox={`0 0 ${svgWidth} ${svgHeightWitoutHeader}`} onMouseMove={this._onMouseMove.bind(this)}>
						<StockChartGraph id="history" data={data} posx={0} posy={0} mouseX={this.state.x} svgWidth={svgWidth} svgHeight={svgHeightWitoutHeader} />
					</svg>
				</div>
			</div>
		);
	}
}

StockChart.defaultProps = {
	bids: [],
	asks: [],
	svgHeight: 300,
	svgWidth: 700
}

export default StockChart