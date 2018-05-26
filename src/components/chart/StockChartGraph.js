import React from 'react'
import {formatDate} from  '../../util/formatNumbers'

class StockChartGraph extends React.Component {
	
	getMostHigh(){
		const {data} = this.props;
		let mostValue = data[0].high;
		data.map(item=>{
			if(item.high > mostValue )
				mostValue = item.high;
		});
		return mostValue;
	}
	
	getMostLow(){
		const {data} = this.props;
		let mostValue = data[0].low;
		data.map(item=>{
			if(item.low < mostValue )
				mostValue = item.low;
		});
		return mostValue;
	}
	
	getPosXStock(posX, posY, mostLow, mostHigh, widthMax, heightMax, mouseX) {
		let result = {posXLine: 0, itemN: -1} ; //error default format
		const { axisXIndex, data} = this.props;
		console.log("Procesando.getPsx", axisXIndex, data, posX, posY, mostLow, mostHigh, widthMax, heightMax, mouseX	);
		const distance = mostHigh - mostLow;
		if(data.length == 0 || mouseX < 0)
			return result;
		const step = widthMax / (data.length + 2);
		const stepMouseX = (mouseX / step)+step;
		const nstep = Math.round(stepMouseX);
		if(nstep >= 0 && nstep < (data.length)){
			result.posXLine= nstep*step;
			result.itemN = nstep;
		}
		console.log("Regresando resultado", result);
		return result;
	}

	makeStock(posX, posY, mostLow, mostHigh, widthMax, heightMax) {
		const { axisXIndex, data} = this.props;
		const distance = mostHigh - mostLow;
		const step = widthMax/(data.length+2);
		const operation = heightMax / distance;
		const widthStock = step * 0.8;
		let stepX = 0;
		return data.map((item, i)=>{
			const y1 = (item.high - mostLow)*operation;
			const y2 = (item.low - mostLow)*operation;
			const yOpen = (item.open - mostLow)*operation;
			const yClose = (item.close - mostLow)*operation;
			const height = item.open < item.close ? yClose - yOpen : yOpen - yClose;
			const y3 = item.open < item.close ? yOpen : yClose;
			const className = item.open < item.close ?  "green" : "red";
			stepX = stepX + step;
			return (
				<g key={i} className={className}>
					<line x1={stepX} y1={y2} x2={stepX} y2={y3}/>
					<line x1={stepX} y1={y3+height} x2={stepX} y2={y1}/>
					<rect x={stepX-widthStock/2} y={y3} width={widthStock} height={height} />
				</g>
				)
		});
	}
	
	makeAxisX(posX, mostLow, mostHigh, widthMax, heightMax, id) {
		const {data, marginAxis} = this.props;
		if(data.length == 0)
			return(
				<path className="linechart_path_empty" /> 
			)
		const minSpace = 100;
		const stepPosX = widthMax/(data.length+2);
		const nXAxis = Math.round((widthMax - 2*stepPosX)/minSpace);
		const step = widthMax/nXAxis;
		const stepToIndex = data.length/nXAxis;
		var rows = [];
		let value = 0 ;
		let axisX = stepPosX;
		let stepIndex = Math.round(stepToIndex);
		for (var i = 0; i < nXAxis + 1; i++) {
			const keyText = id+'_labelT_'+i;
			const keyLine = id+'_labelL_'+i;
			let index =  i * stepIndex;
			
			if(index >= data.length){
				index = data.length -1;
				const valueDate = formatDate(data[index].date);
				axisX =  stepPosX + (index  * stepPosX);
				rows.push(
					<text key={keyText} y={20} transform={`translate(${axisX})`}>
						<tspan x="0" textAnchor="middle" className="text_axis">{valueDate}</tspan>
					</text>
					);
				rows.push(
					<line key={keyLine} x1={axisX} y1="20" x2={axisX} y2={heightMax+20} className="axisx" />
				);
				break;
			}
			/*if(!data[index])
				console.log("FAIL", data, data.length, i, nXAxis, widthMax, stepPosX, stepIndex, index);*/
			const valueDate = formatDate(data[index].date);
			axisX =  stepPosX + (index  * stepPosX);
			rows.push(
				<text key={keyText} y={20} transform={`translate(${axisX})`}>
					<tspan x="0" textAnchor="middle" className="text_axis">{valueDate}</tspan>
				</text>
				);
			rows.push(
				<line key={keyLine} x1={axisX} y1="20" x2={axisX} y2={heightMax+20} className="axisx" />
			);
			value = value + stepToIndex;
		}

		return (rows);
	}

	makeAxisY(posX, mostLow, mostHigh, widthMax, heightMax, id) {
		const {data, nAxis} = this.props;
		if(data.length == 0)
			return(
				<path className="linechart_path_empty" /> 
			)

		const stepValue = (mostHigh-mostLow)/nAxis;
		const step = heightMax/nAxis;
		//console.log("StepY", step, heightMax, nAxis);
		var rows = [];
		let value = mostLow ;
		let axisY = 0;
		for (var i = 0; i < nAxis + 1; i++) {
			const keyText = id+'_labelT_'+i;
			const keyLine = id+'_labelL_'+i;
			const valueInt = parseInt(value);
			if(i == nAxis)
				axisY = heightMax - 1;
			rows.push(
				<line key={keyLine} x1={0} y1={axisY} x2={widthMax} y2={axisY} className="axis" />
			);
			value = value + stepValue;
			axisY = axisY + step;
		}

		return (rows);
	}
	showLabelOnMouseover(posXLine, itemN, posy, svgHeight){
		const {data} = this.props;
		console.log("Render.showLabelOnMouseover", posXLine, itemN, posy, svgHeight);
		if(itemN == -1)
			return(null);
		return(
			<g transform={`translate(${posXLine}, ${posy+30})`}>
				<line x1="0" y1="0" x2="0" y2={svgHeight} className="axisMoused" />
				<text y={svgHeight/2}>
					Open {data[itemN].open}
					Low {data[itemN].low}
					High {data[itemN].high}
					Close {data[itemN].close}
				</text>
			</g>
		)
	}
	
	render(){
		const {id, data, asks, posx, posy, svgWidth, svgHeight, mouseX} = this.props;
		const transform = {translate:`'(${posx})'`}
		//console.log("Render.StockChartGrapxxxxxx", svgWidth, svgHeight, this.props);
		if(data.length == 0 || svgWidth <= 0|| svgHeight <= 0){
			return (null);
		}
		const mostHigh = this.getMostHigh();
		const mostLow = this.getMostLow();
		
		const result = this.getPosXStock(0 , 0, mostLow, mostHigh, svgWidth, svgHeight-30, mouseX);
		console.log("call.getPosXStock", result);
		const {posXLine, itemN} = result;
		return(
			<g id={id} transform={`translate(${posx}, ${posy})`}>
				{this.makeAxisX(0 , mostLow, mostHigh, svgWidth, svgHeight-30, id)}
				<g transform={`translate(0, ${posy+30})`}>
					{this.makeAxisY(0 ,mostLow, mostHigh, svgWidth, svgHeight-30, id)}
					{this.makeStock(0 , 0, mostLow, mostHigh, svgWidth, svgHeight-30)}
					
				</g>
				{this.showLabelOnMouseover(posXLine, itemN, posy, svgHeight-30)}
			</g>
			
		);
	}
}

StockChartGraph.defaultProps = {
	id: '',
	data: [],
	svgHeight: 300,
	svgWidth: 700,
	posx: 0,
	posy: 0,
	nAxis: 6,
	nXAxis: 4,
	axisXIndex: 'date',
	axisLowIndex: 'low',
	axisHighIndex: 'high',
	axisOpenIndex: 'open',
	axisCloseIndex: 'close'
}

export default StockChartGraph;