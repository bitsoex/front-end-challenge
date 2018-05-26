import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { MouseCoordinateY,MouseCoordinateX,CrossHairCursor } from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { ema } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import './Graphic.css'

const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".2f");

function tooltipContent() {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{
					label: "open",
					value: currentItem.open && numberFormat(currentItem.open)
				},
				{
					label: "high",
					value: currentItem.high && numberFormat(currentItem.high)
				},
				{
					label: "low",
					value: currentItem.low && numberFormat(currentItem.low)
				},
				{
					label: "close",
					value: currentItem.close && numberFormat(currentItem.close)
				}
			]
				.filter(line => line.value)
		};
	};
}

const keyValues = ["high", "low"];
const mouseEdgeAppearance = {
	textFill: "#542605",
	stroke: "#05233B",
	strokeOpacity: 1,
	strokeWidth: 3,
	arrowWidth: 5,
	fill: "#BCDEFA",
};
class Graphic extends React.Component {
	removeRandomValues(data) {
		return data.map(item => {
			const newItem = { ...item };
			const numberOfDeletion =
				Math.floor(Math.random() * keyValues.length) + 1;
			for (let i = 0; i < numberOfDeletion; i += 1) {
				const randomKey =
					keyValues[Math.floor(Math.random() * keyValues.length)];
				newItem[randomKey] = undefined;
			}
			return newItem;
		});
	}

	render() {
		let { type, data: initialData, width, ratio } = this.props;

		// remove some of the data to be able to see
		// the tooltip resize
		initialData = this.removeRandomValues(initialData);

		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {
				d.ema20 = c;
			})
			.accessor(d => d.ema20);

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d, c) => {
				d.ema50 = c;
			})
			.accessor(d => d.ema50);

		const margin = { left: 80, right: 80, top: 30, bottom: 50 };

		const calculatedData = ema50(ema20(initialData));
		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			d => d.date
		);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			calculatedData
		);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<section className='section-graphic'>
			<ChartCanvas
				height={350}
				width={width}
				ratio={ratio}
				margin={margin}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} height={230} yExtents={d => [d.high, d.low]} >
				<XAxis axisAt="top" orient="top" stroke={'#384555'} tickStroke={'#384555'}/>
					<YAxis axisAt="right" orient="right" ticks={5} stroke={'#384555'} tickStroke={'#384555'}/>
					<CandlestickSeries opacity={0.4} width={25} 
					fill={d => d.close > d.open ? "#80c156" : "#ba3040"} 
					wickStroke={d => d.close > d.open ? "#80c156" : "#ba3040"} 
					/>
				
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".2f")}
						{...mouseEdgeAppearance}
					/>


					<HoverTooltip
					bgFill={'transparent'}
						yAccessor={d => d.close}
						tooltipContent={tooltipContent()}
						fontSize={15}
					/>
				</Chart>
				<Chart id={2} origin={(w, h) => [0, h - 40]} height={40} yExtents={d => d.volume}>

					<BarSeries width={25} yAccessor={d => d.volume} fill={"#384555"} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".2f")}
						{...mouseEdgeAppearance}
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
				</Chart>
				<CrossHairCursor strokeDasharray="LongDashDot" />
			</ChartCanvas>
			</section>
		);
	}
}

Graphic.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

Graphic.defaultProps = {
	type: "svg"
};
Graphic = fitWidth(Graphic);

export default Graphic;
