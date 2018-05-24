import React from 'react'

import {Stage, Layer, Rect, Line, Text} from 'react-konva';

/**
 * 
 * Componente que dibuja la grafica de Candlestick, dependiendo del book seleccionado en el componente Exchange
 * Utiliza React-Konva, Konva para el trazado de las gráficas (https://github.com/lavrton/react-konva) y (https://konvajs.github.io/)
 *  
 */
export default class CandlesChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //
            data: [],
            daysDraw: 0,
            //minor currency, @ Notations Books, Bitso API
            currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
            //major currency, @ Notations Books, Bitso API
            coin: this.props.currentBook.substr(0, 3).toUpperCase(),
        };
        //numero de periodos que se divide el canvas para mostrar labels de días en la gráfica
        this.periodAxisX = 5;
    }

    /** 
     * 
     * Componete montando, actualiza la grafica
     * 
    */
    componentDidMount() {
        this.updateCandles();
    }

    /** 
     * 
     * Componente debe actualizarse.
     * 
    */
    componentDidUpdate(prevProps, prevState) {
        //Solamente se modifica si se cambia el book, el periodo o el zoom.
        if (prevProps.currentBook !== this.props.currentBook 
            || prevProps.period !== this.props.period 
            || prevProps.zoom !== this.props.zoom)
             this.updateCandles();
    }


    /**
     * 
     * Actualiza los valores OCHL para la graica de Candles
     */
    updateCandles() {
        fetch ('https://bitso.com/trade/chartJSON/'+ this.props.currentBook +'/' + this.props.period)
         .then ( (response) => {
            return response.json();
         })
         .then( (books) => {
            let scale = this.props.zoom / 100.0;
            let length = books.length * (1 - scale); 
            books = books.slice(length);
            this.setState({
                data: books,
                daysDraw: books.length,
                currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
                coin: this.props.currentBook.substr(0, 3).toUpperCase(),
            });
         })
    }

    /**
     * Dibuja la graica de candles
     */
    candles() {
        let lines = [];
        let pasoX = (this.props.w - 80) / this.state.data.length;

        let minY = this.props.h - 75;
        let maxY = 20;

        let mmY = maxY - minY;
        let max = 0.0;
        let min = 500000.00;
        let volMax = 0;

        for (let i = 0; i < this.state.data.length; i++) {
            max = Math.max (parseFloat(this.state.data[i].high), max);
            min = Math.min (parseFloat(this.state.data[i].low), min);
            volMax = Math.max(volMax, this.state.data[i].volume);
        }
        let scale = max - min;

        // Calculo para la divisio de la malla en valores enteros.
        let gridScale = max - min;
        let factorScale = 1;
        if (gridScale > 1) {
            let K = gridScale;
            let c = 0;
            do {
                K = K / 10.0;
                if ( K > 1.0) factorScale = factorScale * 10;
                c++;
            } while ( K > 1.0 && c < 10);
        } 
        else {
            let K = gridScale;
            let c = 0;
            do {
                K = K * 10.0;
                factorScale = factorScale * 0.1;
                c++;
            } while ( K < 1.0 && c < 10);
        }

        let minScale = min / factorScale;
        let gridInicial = Math.trunc(minScale) * factorScale;
        let k = 0;
        
        //Dibujas las lineas de valores enteros, 
        while ( gridInicial < (max)) {
            let yGrid = mmY * ((gridInicial - min) / scale) + minY;
            lines.push( <Line points={[ -10000 , yGrid, this.props.w - 80, yGrid]} fill={this.props.theme.gridColor} stroke={this.props.theme.gridColor} key={k++}  dash={[3,3]} /> );
            lines.push( <Text x={this.props.w - 70} y={yGrid - 7} text={gridInicial} textFill={this.props.theme.gridColor} fill={this.props.theme.gridColor} key={k++} /> );
            gridInicial += factorScale;
        }

        //Dibujas las lieas de separacióode díai
        let stepAxisX = this.state.data.length / this.periodAxisX;
        for (let i = 0; i < this.state.data.length; i+=stepAxisX) {
            lines.push( <Line points={[ i * pasoX + pasoX/2 , 25, i*pasoX + pasoX/2, 1000]} 
                fill={this.props.theme.gridColor} stroke={this.props.theme.gridColor} dash={[3,3]} key={k++}  /> );
            if ( this.state.data[i] !== undefined ) {
                lines.push( <Text x={i * pasoX + pasoX/2 - 25} y={8} text={this.state.data[i].dated} 
                    textFill={this.props.theme.gridColor} fill={this.props.theme.gridColor} key={k++} /> );
            }
        }

        // Dibuja linea sobre la linea de close
        // for (let i = 0; i + 1< this.state.data.length; i++) {
        //     let y0 = mmY * ((this.state.data[i].close - min) / scale) + minY;
        //     let y1 = mmY * ((this.state.data[i+1].close - min) / scale) + minY;
        //     lines.push( <Line points={[ i * pasoX + pasoX/2 , y0, (i+1)*pasoX + pasoX/2, y1]} fill={'blue'} stroke={'blue'} key={k++}  /> );
        // }

        // Dibuja volumen
        let highVol = 75;
        for (let i = 0; i < this.state.data.length; i++) {
            let vol = this.state.data[i].volume / volMax * highVol;
            let xRect = i * pasoX + pasoX/4;
            lines.push( <Rect x={xRect} y={this.props.h - vol} width={pasoX/2} height={vol} 
                fill={this.props.theme.volFill} stroke={this.props.theme.volLine}  key={k++} shadowBlur={5}
                data={this.state.data[i]} 
                onMouseMove={(e)=>this.handleMouseMove(e)} onMouseOut={(e)=>this.handleMouseOut(e)} 
                onTouchStart ={(e)=>this.handleMouseMove(e)}  onTouchEnd = {(e)=>this.handleMouseOut(e)} /> );
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

            lines.push( <Line points={[ i * pasoX + pasoX/2 , y0, i*pasoX + pasoX/2, y1]} fill={colorBook} stroke={colorBook} key={k++}  /> );

            lines.push( <Rect x={xRect} y={yRect} width={pasoX/2} height={yHeight} 
                fill={colorFill} stroke={colorBook}  key={k++} shadowBlur={5} 
                data={this.state.data[i]}
                onMouseMove={(e)=>this.handleMouseMove(e)} onMouseOut={(e)=>this.handleMouseOut(e)} 
                onTouchStart ={(e)=>this.handleMouseMove(e)}  onTouchEnd = {(e)=>this.handleMouseOut(e)}
                /> );
        }
        return lines;
    }
    
    /**
     * 
     * Funcio de soporte para generar formato para el tooltip dependiendo si es MXN óoryptocurrency
     * 
     */
    parseCurrency (v) {
        let tmp = parseFloat(v);
        if (this.state.currency === 'MXN') {
            tmp = '$' + tmp.toFixed(2) + ' MXN';
        } else {
            tmp = tmp.toFixed(8) + ' ' + this.state.currency;
        }
        return tmp;
    }

    /**
     * 
     * Funcio de soporte para generar formato para el volumen en el tooltip
     * 
     */
    parseCurrencyVol (v) {
        let tmp = parseFloat(v);
        tmp = tmp.toFixed(2);
        return tmp;
    }

    /**
     * 
     * Funcio de soporte para mostrar el tooltip cuando se mueve el puntero sobre un componente de Candle o Volumen
     * 
     */
    handleMouseMove (e) {
        let offset = 0;
        let x = e.target.attrs.x;
        let y = e.target.attrs.y;

        if (x - 150 < 0) {
            offset = 160;
        }

        this.refs.tooltipRect.position({x: x - 150 + offset, y: y - 43});
        this.refs.tooltipRect.show();

        let open = this.parseCurrency(e.target.attrs.data.open); 
        let close = this.parseCurrency(e.target.attrs.data.close);
        let high = this.parseCurrency(e.target.attrs.data.high);
        let low = this.parseCurrency(e.target.attrs.data.low);
        let vol = this.parseCurrencyVol(e.target.attrs.data.volume);

        this.refs.textOpen.position({x: x - 140 + offset, y: y - 33});
        this.refs.textOpen.text('Open ' + open);
        this.refs.textOpen.show();

        this.refs.textClose.position({x: x - 140 + offset, y: y - 18});
        this.refs.textClose.text('Close ' + close);
        this.refs.textClose.show();

        this.refs.textHigh.position({x: x - 140 + offset, y: y - 3});
        this.refs.textHigh.text('High ' + high);
        this.refs.textHigh.show();

        this.refs.textLow.position({x: x - 140 + offset, y: y + 12});
        this.refs.textLow.text('Low ' + low);
        this.refs.textLow.show();

        this.refs.textVol.position({x: x - 140 + offset, y: y + 27});
        this.refs.textVol.text('Vol. ' + vol + ' ' + this.state.coin);
        this.refs.textVol.show();

        this.refs.layerTooltip.batchDraw();
    }

    /**
     * 
     * Función de soporte para ocultar el tooltip cuando el puntero sale de un componente de Candle o Volumen
     * 
     */
    handleMouseOut (e) {
        this.refs.textOpen.hide();
        this.refs.textClose.hide();
        this.refs.textHigh.hide();
        this.refs.textLow.hide();
        this.refs.textVol.hide();
        this.refs.tooltipRect.hide();
        this.refs.layerTooltip.draw();
    }

    
    /**
     * 
     * Renderiza la grafica de Candlestick, utiliza dos layers:
     * 
     * Layer A: Grafica de candles y volumen
     * Layer B: Tooltip de informacio
     * 
     */
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
