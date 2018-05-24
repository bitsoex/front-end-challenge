import React from 'react'

import {Stage, Layer, Line, Text, Circle} from 'react-konva';

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

            let rangeBi
            let sum = 0;
            let jBid = 0;

            let rangeMax = parseFloat(this.state.bids[0].price);
            let rangeMin = parseFloat(rangeMax - rangeBids);

            let data = new Array(this.props.w);

            for (let x = w2; x >= 0; x--) {
                
                let sumRange = 0;
                for ( let j = 0; j < this.state.bids.length; j++) {
                    if (parseFloat(this.state.bids[j].price) <= rangeMax && parseFloat(this.state.bids[j].price) >= rangeMin)
                        sumRange += parseFloat(this.state.bids[j].amount);
                    if (parseFloat(this.state.bids[j].price) < rangeMin) break;
                }
                sum += sumRange;    
                data[x] = {x: x, max: rangeMax, min: rangeMin, side: 'bids', sum: sumRange, sumTotal: sum};
                rangeMax = rangeMin;
                rangeMin = rangeMax - rangeBids;
            }
            
            
            for (let x = w2; x >= 0; x--) {
                let y = data[x].sumTotal / sum;
                lines.push( <Line points={[ x , this.props.h - (y * (this.props.h-30)), x, this.props.h]} fill={'#455840'} stroke={'#455840'} key={k++} /> );
            }

            // - asks
            sum = 0;
            this.state.bids[0].price * (this.props.spead/100.0) / w2;
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
                data[x] = {x: x, max: rangeMax, min: rangeMin, side: 'bids', sum: sumRange, sumTotal: sum};
                rangeMin = rangeMax;
                rangeMax = rangeMin + rangeAsks;
            }

            for (let x = Math.trunc(this.props.w / 2) + 10; x < this.props.w; x++) {
                let y = data[x].sumTotal / sum;
                lines.push( <Line points={[ x , this.props.h - (y * (this.props.h-30)), x, this.props.h]} fill={'#59252e'} stroke={'#59252e'} key={k++} /> );
            }

        }
        return lines;
    }


    /**
     * 
     * Renderiza la grafica de DeepMarket, utiliza dos layers:
     * 
     * Layer A: Grafica de Deep Market 
     * Layer B: Tooltip de información
     * 
     */
    render () {
        return (
            <Stage width={this.props.w} height={this.props.h}  >
                <Layer>
                    { this.deepMarket() }
                </Layer>

                <Layer ref='layerTooltip'>
                    <Text ref='textPrice' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Open' />
                    <Text ref='textSum' textFill={'white'} fill={'white'} alpha={0.75} visible={false} text='Close' />
                    <Line ref='lineAxis' visible={false} />
                    <Circle ref='pointAxis' visible={false} />
                </Layer>
            </Stage>
        );
    }
}