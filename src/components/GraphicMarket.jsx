import React from 'react'
import NumberFormat from 'react-number-format';

import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';



class GraphicMarket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            period: 15,
            hoverColor: this.props.theme.bodyExchangeColor,
        }
    }

    componentDidMount() {
        // Para generar la gráfica de mercado solamente se puede obtener la información por día, se utilizan los últimos 15 días
        fetch ('https://bitso.com/trade/chartJSON/'+ this.props.book +'/1month')
         .then ( (response) => {
            return response.json();
         })
         .then( (books) => {
            //los ultimos 15 dias
            books = books.slice(Math.max(books.length - this.state.period, 1));
            this.setState({
                data: books,
                
            });
         })
    }

    chartClose () {
        let lines = [];
        let minY = 80;
        let maxY = 0;
        let mmY = maxY - minY;
        let max = 0;
        let min = 5000000;
        let pasoX = 270 / (this.state.period-1);
        const colorBook = (this.state.data[ this.state.data.length - 1].value - this.state.data[ this.state.data.length - 2].value) >= 0 ? this.props.theme.greenLight:this.props.theme.redLight
        for (let i = 0; i < this.state.data.length-1; i++) {
            max = Math.max (this.state.data[i].value, max);
            min = Math.min (this.state.data[i].value, min);
        }
        let scale = max - min; 
        for (let i = 0; i < this.state.data.length-1; i++) {
            let y0 = mmY * ((this.state.data[i].value - min) / scale) + minY;
            let y1 = mmY * ((this.state.data[i+1].value - min) / scale) + minY;
            lines.push( <Line points={[ i * pasoX + pasoX/2 , y0, (i+1)*pasoX + pasoX/2, y1]} fill={colorBook} stroke={colorBook} key={i} onMouseEnter={ (e) => this.clicPoint(e)} /> );
        }
        return lines;
    }

    clicPoint (e) {
        console.info (e);
    }

    render () {
        const book = this.props.book;
        const bookHeader = this.props.book.toUpperCase().replace(/_/g,'/');
        const currency = bookHeader.substr(bookHeader.length-3);
        if (this.state.data.length > 0) {
            const colorBook = (this.state.data[ this.state.data.length - 1].value - this.state.data[ this.state.data.length - 2].value) >= 0 ? this.props.theme.greenLight:this.props.theme.redLight
            //Forzar a obtener numero para poder generar el formato de moneda, tipo de objeto this.state.data[ this.state.data.length - 1].value ==> string        
            const value = parseFloat(this.state.data[ this.state.data.length - 1].value);
            return (
                <div style={{ fontWeight: 'bold' , borderTop: '1px solid ' + this.props.theme.gray , transition: 'height 1s', 
                        height: this.props.activeGraphic?'10em':'2em', cursor: this.props.activeGraphic?'default':'pointer' }} 
                        onClick={this.props.onClick}  >

                    <div style={{ backgroundColor: this.props.activeGraphic?this.props.theme.activeMarket:this.props.theme.bodyMarkets , 
                            height: '2em' , paddingTop: '0.5em' }}>
                        <div style={{ display: 'inline-block', position: 'absolute', paddingLeft: '1em' }}>
                            {bookHeader}
                        </div>

                        <div style={{ display: 'inline-block', position: 'absolute', right: '0px', color: colorBook }}>
                            <NumberFormat value={value} 
                                displayType={'text'} thousandSeparator={true} prefix={'$'}  decimalScale={currency==='MXN'?2:8} suffix={' ' + currency} />
                        </div>
                    </div>
                    <div style={{ display:  this.props.activeGraphic?'block':'none' }}>
                        <Stage width={270} height={80}  >
                            <Layer>
                                { this.chartClose() }
                            </Layer>
                        </Stage>
                    </div>
                </div>
            );
        } else {
            return (<div style={{ fontWeight: 'bold' , borderBottom: '1px solid ' + this.props.theme.gray   }} >Cargando...</div>);
        }
    }
}

export default GraphicMarket;