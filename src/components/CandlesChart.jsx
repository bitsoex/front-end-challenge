import React from 'react'

import {Stage, Layer, Rect, Line, Text} from 'react-konva';

export default class CandlesChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            daysDraw: 0,
            currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
            coin: this.props.currentBook.substr(0, 3).toUpperCase(),
        };

        
    }

    componentDidMount() {
        this.updateCandles();
        //console.info (this.refs.layerTooltip);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentBook !== this.props.currentBook) 
             this.updateCandles();
    }



    updateCandles() {
        fetch ('https://bitso.com/trade/chartJSON/'+ this.props.currentBook +'/' + this.props.period)
         .then ( (response) => {
            return response.json();
         })
         .then( (books) => {
            this.setState({
                data: books,
                daysDraw: books.length,
                currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
                coin: this.props.currentBook.substr(0, 3).toUpperCase(),
            });
         })
    }

    candles() {
        let lines = [];
        let pasoX = (this.props.w - 80) / this.state.data.length;
        console.info ("PX:" + pasoX);

        let minY = this.props.h - 75;
        let maxY = 5;

        let mmY = maxY - minY;
        let max = 0;
        let min = 5000000;

        for (let i = 0; i < this.state.data.length; i++) {
            max = Math.max (this.state.data[i].high, max);
            min = Math.min (this.state.data[i].low, min);
        }
        let scale = max - min;

        // Dibuja linea sobre la linea de close
        for (let i = 0; i + 1< this.state.data.length; i++) {
            let y0 = mmY * ((this.state.data[i].close - min) / scale) + minY;
            let y1 = mmY * ((this.state.data[i+1].close - min) / scale) + minY;
            lines.push( <Line points={[ i * pasoX + pasoX/2 , y0, (i+1)*pasoX + pasoX/2, y1]} fill={'blue'} stroke={'blue'} key={i + this.state.data.length * 2}  /> );
        }

        // Dibuja lineas high, low y rectangulos de open y close.
        for (let i = 0; i < this.state.data.length; i++) {
            let y0 = mmY * ((this.state.data[i].high - min) / scale) + minY;
            let y1 = mmY * ((this.state.data[i].low - min) / scale) + minY;
            const colorBook = this.state.data[i].open<this.state.data[i].close?this.props.theme.greenLine:this.props.theme.redLine;
            const colorFill = this.state.data[i].open<this.state.data[i].close?this.props.theme.greenFill:this.props.theme.redFill;
            
            let xRect = i * pasoX + pasoX/4;
            let maxYRect = Math.max(this.state.data[i].open, this.state.data[i].close);
            let minYRect = Math.min(this.state.data[i].open, this.state.data[i].close);

            let yRect = mmY * ((maxYRect - min) / scale) + minY;
            let yHeight = (mmY * ((minYRect - min) / scale) + minY) - yRect;

            lines.push( <Line points={[ i * pasoX + pasoX/2 , y0, i*pasoX + pasoX/2, y1]} fill={colorBook} stroke={colorBook} key={i}  /> );
            lines.push( <Rect x={xRect} y={yRect} width={pasoX/2} height={yHeight} 
                fill={colorFill} stroke={colorBook}  key={i + this.state.data.length} shadowBlur={5} 
                onMouseMove={(e)=>this.handleMouseMove(e)} onMouseOut={(e)=>this.handleMouseOut(e)} data={this.state.data[i]} /> );
        }

        


        return lines;
    }
    
    parseCurrency (v) {
        let tmp = parseFloat(v);
        if (this.state.currency === 'MXN') {
            tmp = '$' + tmp.toFixed(2) + ' MXN';
        } else {
            tmp = tmp.toFixed(8) + ' ' + this.state.currency;
        }
        return tmp;
    }

    parseCurrencyVol (v) {
        let tmp = parseFloat(v);
        tmp = tmp.toFixed(2);
        return tmp;
    }

    handleMouseMove (e) {
        let offset = 0;
        
        if (e.evt.layerX - 150 < 0) {
            offset = 160;
        }

        this.refs.tooltipRect.position({x: e.evt.layerX - 150 + offset, y: e.evt.layerY - 43});
        this.refs.tooltipRect.show();

        let open = this.parseCurrency(e.target.attrs.data.open); 
        let close = this.parseCurrency(e.target.attrs.data.close);
        let high = this.parseCurrency(e.target.attrs.data.high);
        let low = this.parseCurrency(e.target.attrs.data.low);
        let vol = this.parseCurrencyVol(e.target.attrs.data.volume);

        this.refs.textOpen.position({x: e.evt.layerX - 140 + offset, y: e.evt.layerY - 33});
        this.refs.textOpen.text('Open ' + open);
        this.refs.textOpen.show();

        this.refs.textClose.position({x: e.evt.layerX - 140 + offset, y: e.evt.layerY - 18});
        this.refs.textClose.text('Close ' + close);
        this.refs.textClose.show();

        this.refs.textHigh.position({x: e.evt.layerX - 140 + offset, y: e.evt.layerY - 3});
        this.refs.textHigh.text('High ' + high);
        this.refs.textHigh.show();

        this.refs.textLow.position({x: e.evt.layerX - 140 + offset, y: e.evt.layerY + 12});
        this.refs.textLow.text('Low ' + low);
        this.refs.textLow.show();

        this.refs.textVol.position({x: e.evt.layerX - 140 + offset, y: e.evt.layerY + 27});
        this.refs.textVol.text('Vol. ' + vol + ' ' + this.state.coin);
        this.refs.textVol.show();

        this.refs.layerTooltip.batchDraw();
    }

    handleMouseOut (e) {
        this.refs.textOpen.hide();
        this.refs.textClose.hide();
        this.refs.textHigh.hide();
        this.refs.textLow.hide();
        this.refs.textVol.hide();
        this.refs.tooltipRect.hide();
        this.refs.layerTooltip.draw();
    }

    toolTip () {

    }
    

    render () {
        return (
            <Stage width={this.props.w} height={this.props.h}  >
                <Layer>
                    { this.candles() }
                </Layer>

                <Layer ref='layerTooltip'>
                    <Rect ref='tooltipRect' fill={'#232b34'} stroke={'#424b55'} 
                        width={145} height={90} shadowBlur={5} visible={false}  opacity={0.5} cornerRadius={15} />

                    <Text ref='textOpen' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Open' />
                    <Text ref='textClose' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Close' />
                    <Text ref='textHigh' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='High' />
                    <Text ref='textLow' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Low' />
                    <Text ref='textVol' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Vol. ' />
                </Layer>
            </Stage>
        );
    }
}