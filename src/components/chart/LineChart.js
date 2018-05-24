import React, {Component} from "react"
import logoA from '../../assets/images/1x/icon_deep.png'
import logoDown from '../../assets/images/1x/icon_dropdown.png'
import LineChartGraph from './LineChartGraph'

class LineChart extends React.Component {

	render() {
		const {svgHeight, svgWidth, bids, asks, changeGraph} = this.props;
		const distance_between = 70;
		let svgHeightWitoutHeader = svgHeight - 30;
		//console.log("render.LineChart", this.props);
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph" onClick={e=>changeGraph()}>
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

LineChart.defaultProps = {
  bids: [],
  asks: [],
  svgHeight: 300,
  svgWidth: 700
}

export default LineChart