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
		const {svgHeight, svgWidth, bookSelected, data, changeGraph, changePeriodInterval, selectedPeriod} = this.props;
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
		const itemsMenuIntervalo = [{
			label: '1 hr',
			action: ()=>{}
			},{
			label: '12 hr',
			action: ()=>{}
			},{
			label: '1 día',
			action: ()=>{}
			},{
			label: '5 días',
			action: ()=>{}
			}]
		let periodoLabel = selectedPeriod;
		PERIODS.map(period=>{
			if(period.value ==selectedPeriod)
				periodoLabel = period.label;
		});
		/*onClick={e=>changeGraph()}*/
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph button" onClick={e=>changeGraph()}>
								<img src={logoA} />
							</div>
							<div className="menu_graph button selected">
								<img src={logoB} />
							</div>
						</li>
						<li className="vcenter ">
							<span className="labelItem">Periodo&nbsp;&nbsp;&nbsp;</span>
							<DropDown items={itemsMenu}>
								<div className="menu_graph">
									{periodoLabel}
									<img src={logoDown} />
								</div>
							</DropDown>
						</li>
						<li className="vcenter ">
							<span className="labelItem">Intervalo&nbsp;&nbsp;</span>
							
								<div className="menu_graph button2 disabled">
									1 hr
									<img src={logoDown} />
								</div>
							
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