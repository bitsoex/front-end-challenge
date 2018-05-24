import React from 'react'

import {Stage, Layer, Line, Text, Circle, Rect} from 'react-konva';

/**
 * 
 * Componente que dibuja la grafica de deep market, dependiendo del book seleccionado en el componente Exchange
 * Utiliza React-Konva, Konva para el trazado de las gráficas (https://github.com/lavrton/react-konva) y (https://konvajs.github.io/)
 * 
 * 
 */
export default class DeepMarketChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bids: [],
            asks: [],
            data: [],
            currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
            coin: this.props.currentBook.substr(0, 3).toUpperCase(),
        }
    }
    
    /** 
     * 
     * Componete montando, actualiza la grafica
     * 
    */
    componentDidMount() {
        this.updateDeepmarket();
    }

    /** 
     * 
     * Componente debe actualizarse.
     * 
    */
    componentDidUpdate(prevProps, prevState) {
        //Solamente se modifica si se cambia el book
        if (prevProps.currentBook !== this.props.currentBook)
             this.updateDeepmarket();
    }


    /**
     * 
     * Actualiza los valores OCHL para la gráfica de Candles
     * 
     */
    updateDeepmarket() {
        fetch ('https://api.bitso.com/v3/order_book/?book='+ this.props.currentBook +'&aggregate=false')
         .then ( (response) => {
            return response.json();
         })
         .then( (books) => {

            this.setState({
                asks: books.payload.asks,
                bids: books.payload.bids,
                currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
                coin: this.props.currentBook.substr(0, 3).toUpperCase(),
            });

         })
    }

    /**
     * 
     * Dibuja la grafica del mercado en el porcentaje del spead
     * 
     * 
     */
    deepMarket() {
        let lines = [];
        if (this.state.bids.length > 0) {

            let k = 0;
            // -bids
            let w2 = Math.trunc(this.props.w / 2) - 5; // 500 -> 250-5=>245
            let rangeBids = this.state.bids[0].price * (this.props.spead/100.0) / w2;
            //console.info ('spead: ' + this.props.spead + ' : ' + this.state.bids[0].price + ' : ' + w2 + ' : ' + rangeBids);

            let sum = 0;

            let rangeMax = parseFloat(this.state.bids[0].price);
            let rangeMin = parseFloat(rangeMax - rangeBids);

            this.data = new Array(this.props.w);

            for (let x = w2; x >= 0; x--) {
                
                let sumRange = 0;
                for ( let j = 0; j < this.state.bids.length; j++) {
                    if (parseFloat(this.state.bids[j].price) <= rangeMax && parseFloat(this.state.bids[j].price) >= rangeMin)
                        sumRange += parseFloat(this.state.bids[j].amount);
                    if (parseFloat(this.state.bids[j].price) < rangeMin) break;
                }
                sum += sumRange;    
                this.data[x] = {x: x, max: rangeMax, min: rangeMin, side: 'bids', sum: sumRange, sumTotal: sum};
                rangeMax = rangeMin;
                rangeMin = rangeMax - rangeBids;
            }
            
            this.sumBids = sum;
            for (let x = w2; x >= 0; x--) {
                let y = this.data[x].sumTotal / sum;
                lines.push( <Line points={[ x , this.props.h - (y * (this.props.h-30)), x, this.props.h]} fill={'#455840'} stroke={'#455840'} key={k++} /> );
            }

            // - asks
            sum = 0;
            let rangeAsks = this.state.asks[0].price * (1.0 + this.props.spead/100.0) / w2;
            rangeMin = parseFloat(this.state.asks[0].price);
            rangeMax = rangeMin + rangeAsks;
            for (let x = Math.trunc(this.props.w / 2) + 10; x < this.props.w; x++) {
                let sumRange = 0;
                for ( let j = 0; j < this.state.asks.length; j++) {
                    if (parseFloat(this.state.asks[j].price) <= rangeMax && parseFloat(this.state.asks[j].price) >= rangeMin)
                        sumRange += parseFloat(this.state.asks[j].amount);
                    if (parseFloat(this.state.asks[j].price) > rangeMax) break;
                }
                sum += sumRange;
                this.data[x] = {x: x, max: rangeMax, min: rangeMin, side: 'asks', sum: sumRange, sumTotal: sum};
                rangeMin = rangeMax;
                rangeMax = rangeMin + rangeAsks;
            }

            this.sumAsks = sum;
            for (let x = Math.trunc(this.props.w / 2) + 10; x < this.props.w; x++) {
                let y = this.data[x].sumTotal / sum;
                lines.push( <Line points={[ x , this.props.h - (y * (this.props.h-30)), x, this.props.h]} fill={'#59252e'} stroke={'#59252e'} key={k++} /> );
            }

            //this.setState({data: this.data});
        }
        return lines;
    }


    /**
     * 
     * Funcio de soporte para generar formato para el tooltip dependiendo si es MXN Ã³oryptocurrency
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
     * Manejo del movimiento del mouse en la grafica, muestra los datos de acumulacion y precio
     * 
     * @param {MouseEvent} e
     *  
     */
    handleMouseMove(e) {

        let pos = this.refs.stage.getStage().getPointerPosition();
        let x = pos.x;

        if (this.data !== undefined ) {
            
            let index = Math.trunc(x);
            if (this.data[index] !== undefined ) {
                let y = this.data[x].sumTotal;
                if (this.data[x].side==='bids') { 
                    y = y / this.sumBids;
                    this.refs.lineAxis.fill('#85ad6b');
                    this.refs.lineAxis.stroke('#85ad6b');
                    this.refs.pointAxis.stroke('#85ad6b');
                } else {
                    y = y / this.sumAsks;
                    this.refs.lineAxis.fill('#b32f3e');
                    this.refs.lineAxis.stroke('#b32f3e');
                    this.refs.pointAxis.stroke('#b32f3e');
                }
                y = this.props.h - (y * (this.props.h-30));

                let price = (this.data[x].min + this.data[x].max)/2;
                price = this.parseCurrency(price);
                this.refs.textPrice.text(price);
                this.refs.textSum.text( this.data[x].sumTotal );

                this.refs.textPrice.position({x: x + 10, y: y - 30 });
                this.refs.textSum.position({x: x + 10, y: y - 14 });
                

                this.refs.lineAxis.points([x, y - 30, x, this.props.h]);
                this.refs.pointAxis.position({x: x, y: y });
            }
        }

        
        this.refs.textPrice.show();
        this.refs.textSum.show();
        this.refs.pointAxis.show();
        this.refs.lineAxis.show();

        this.refs.layerTooltip.batchDraw();
    }

    handleMouseOut (e) {
        
    }

    /**
     * 
     * Renderiza la grafica de DeepMarket, utiliza dos layers:
     * 
     * Layer A: Grafica de Deep Market 
     * Layer B: Tooltip de informacio
     * 
     */
    render () {
        return (
            <Stage width={this.props.w} height={this.props.h} ref='stage'>
                <Layer >

                    { this.deepMarket() }

                    <Rect x={0} y={0} width={this.props.w} height={this.props.h} fill={'white'} stroke={'white'} opacity={0.01} 
                    onMouseMove={(e)=>this.handleMouseMove(e)} onMouseOut={(e)=>this.handleMouseOut(e)} 
                    onTouchStart ={(e)=>this.handleMouseMove(e)}  onTouchEnd = {(e)=>this.handleMouseOut(e)} />
                </Layer>

                <Layer ref='layerTooltip'>
                    

                    <Line ref='lineAxis' visible={false} dash={[3, 3]} />
                    <Circle ref='pointAxis' visible={false} radius={5} x={100} y={100} fill='#191e23' stroke='white' />

                    <Text ref='textPrice' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Open' />
                    <Text ref='textSum' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Close' />
                </Layer>
            </Stage>
        );
    }
}