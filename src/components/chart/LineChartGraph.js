import React from 'react'

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

	getSvgX(x, posX, widthMax) {
		const {axisXIndex, axisYIndex} = this.props;
		return  posX + (((x -this.getMinX()) * widthMax) / (this.getMaxX() - this.getMinX()));
	}
	getSvgY(y, posY, heightMax) {
		const {axisXIndex, axisYIndex} = this.props;
		return posY + (heightMax - (y / this.getMaxY() * heightMax));
	}
	
	makeFill(posX, posY, widthMax, heightMax) {
		const { axisXIndex, axisYIndex, data} = this.props;
		if(data.length == 0)
			return(null)
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

	makePath(posX, posY, widthMax, heightMax, id) {
		const {data, axisXIndex, axisYIndex} = this.props;
		if(data.length == 0)
			return(
				<path className="linechart_path_empty" /> 
			)
		let lastY = this.getSvgY(data[0][axisYIndex], posY, heightMax);
		let pathD = "";
		if(id === "asks")
			pathD += "M 0 " + heightMax;
		else
			pathD += "M 0 " + lastY;
			
		//pathD+=  " L 0 " + lastY + " ";
		pathD += data.map((point, i) => {
			let actualY = lastY;
			lastY = this.getSvgY(point[axisYIndex], posY, heightMax);
			return ("L " + this.getSvgX(point[axisXIndex], posX, widthMax) + " " + actualY + " ") + "L " + this.getSvgX(point[axisXIndex], posX, widthMax) + " " + lastY  + " ";
		});
		if(id === "bids")
			pathD += "L " + this.getSvgX(this.getMaxX(), posX, widthMax) + " " + heightMax;
		return (
		  <path className="linechart_path" d={pathD} /> 
		);
	}
	// BUILD GRID AXIS
	makeAxis(posX, widthMax, heightMax, id) {
		const {data, nAxis, marginAxis} = this.props;
		if(data.length == 0)
			return(null)
		const minX = this.getMinX(), maxX = this.getMaxX();
		const minY = this.getMinY(), maxY = this.getMaxY();
		const step = (widthMax - 2*marginAxis)/(nAxis-1);
		const stepValue = (maxX - minX)/nAxis;
		
		var rows = [];
		let value = minX ;
		let axisX = marginAxis;
		for (var i = 0; i < nAxis; i++) {
			const keyText = id+'_labelT_'+i;
			const keyLine = id+'_labelL_'+i;
			const valueInt = parseInt(value);
			rows.push(
				<text key={keyText} y={20} transform={`translate(${axisX})`}>
					<tspan x="0" textAnchor="middle" className="text_axis">{value.toFixed(2)}</tspan>
				</text>
				);
			rows.push(
				<line key={keyLine} x1={axisX} y1="20" x2={axisX} y2={heightMax+20} className="axis" />
			);
			value = value + stepValue;
			axisX = axisX + step;
		}

		return (rows);
	}
	
	/*
	*/
	
	render(){
		const {id, data, asks, posx, posy, width, height} = this.props;
		const transform = {translate:`'(${posx})'`};
		//console.log("start linchart", id);
		return(
			<g id={id} transform={`translate(${posx}, ${posy})`}>
				{this.makeAxis(0 , width, height-30, id)}
				<g transform={`translate(0, ${posy+30})`}>
					{this.makePath(0 , 0, width, height-30, id)}
					{this.makeFill(0 , 0, width, height-30)}					
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
	nAxis: 4,
	marginAxis: 50,
	axisXIndex: 'r',
	axisYIndex: 'sum'
}

export default LineChartGraph;