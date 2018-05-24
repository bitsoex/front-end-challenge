import React, {Component} from "react"
import logoA from '../../assets/images/1x/icon_candles.png'
import logoDown from '../../assets/images/1x/icon_dropdown.png'
import StockChartGraph from './StockChartGraph'

const PERIODS =["1month","3months", "1year"];

class StockChart extends React.Component {

	render() {
		const {svgHeight, svgWidth, bookSelected, historytrades, changeGraph, changePeriodInterval} = this.props;

		let svgHeightWitoutHeader = svgHeight - 30;
		return (
			<div>
				<div className="header">
					<ul className="expand">
						<li className="vcenter ">
							<div className="menu_graph" onClick={e=>changeGraph()}>
								<img src={logoA} />
								<img src={logoDown} />
							</div>
							<div className="menu_graph" onClick={e=>changePeriodInterval(bookSelected, PERIODS[0], 'wtf')}>
								{PERIODS[0]}
							</div>
							<div className="menu_graph" onClick={e=>changePeriodInterval(bookSelected, PERIODS[1], 'wtf')}>
								{PERIODS[1]}
							</div>
							<div className="menu_graph" onClick={e=>changePeriodInterval(bookSelected, PERIODS[2], 'wtf')}>
								{PERIODS[2]}
							</div>
						</li>
					</ul>
				</div>
				<div className="graps">
					<svg viewBox={`0 0 ${svgWidth} ${svgHeightWitoutHeader}`}>
						<StockChartGraph id="history" data={historytrades} posx={0} posy={0} width={svgWidth} height={svgHeightWitoutHeader} />
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