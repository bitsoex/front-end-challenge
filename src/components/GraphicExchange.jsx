import React from 'react'
import BookContext from './BookContext'


import Select from 'react-select';
import './react-select-custom.css';

import GraphicOption from './GraphicOption'
import GraphicValue from './GraphicValue'

import DropDown from '../imgs/icon_dropdown.svg';
import Candles from '../imgs/icon_candles.svg';
import DeepMarket from '../imgs/icon_deep.svg';

import CandlesChart from './CandlesChart'
import DeepMarketChart from './DeepMarketChart'

/**
 * 
 * Componente para la zona de graficas de exchange, puede renderizar Candlestick o DeepMarket
 * 
 *  
 */
class GraphicExchange extends React.Component {

    constructor (props) {
        super(props);

        // valores para SelectItem
        this.graphics = [
            {
                name: 'Candles',
                value: 'candles',
                image: Candles,
            },
            {
                name: 'Deep Market',
                value: 'deepmarket',
                image: DeepMarket,
            }
        ];

        this.state = {
            //grafica candles default
            graphic: 'deepmarket',
            //grafica candles default
            value: this.graphics[1],
            //tema default para los botones de zoom de graficas de candlestick
            colorButton: this.props.theme.bodyExchangeColor,
            //tema default para el texto de los botones de zoom de graficas de candlestick
            textColor: this.props.theme.foreground,
            //periodo default para grafica de candlestick
            period: '1month',
            //zoom default para grafica de candlestick
            zoom: 100,
            //zoom default para grafica deep market
            spead: 5,
        };

        this.buttonLess = React.createRef();
        this.buttonMore = React.createRef();

        this.myRefChart = React.createRef();
    }

    /**
     * 
     * Handle para onMouseDown del boton
     * 
     * @param {ref button} r 
     */
    down (r) {
        r.current.style.backgroundColor = this.props.theme.foreground;
        r.current.style.color = this.props.theme.bodyExchangeColor;
    }

    /**
     * 
     * Handle para onMouseUp del boton
     * 
     * @param {ref button} r 
     */
    up (r) {
        r.current.style.backgroundColor = this.props.theme.bodyExchangeColor;
        r.current.style.color = this.props.theme.foreground;
    }

    
    /**
     * Seleccion de la grafica candlestick o deepmarket
     */
    setValue(value) {
        this.setState({value: value, graphic: value.value});
    }

    /**
     * Cambio de periodo a visualizar en la grafica, para el challenger existen las opciones 1month, 3months o 1year
     */
    changePeriod (e) {
        this.setState({period : e.target.value, zoom: 100})
    }

    /**
     * Funcion soporte para Select, imagen customizable de dropdown
     */
    arrowRenderer () {
        return <img src={require('../imgs/icon_dropdown.svg')}  alt='dd' style={{height: '0.75em', width: '0.75em'}}/>
    }

    /**
     * Seleccion de componente a renderizar CandlesChart o DeepMarketChart
     */
    drawChart () {
        const w = this.props.widthScreen - 270 - 30;
        if (this.state.graphic === 'candles') {
            return (
                <CandlesChart h={300} 
                    w={w} zoom={this.state.zoom}
                    theme={this.props.theme} period={this.state.period} intervalo={'1dia'} currentBook={this.props.currentBook} />
            );
        } else {
            return (
                <DeepMarketChart h={300} 
                    w={w} spead={this.state.spead}
                    theme={this.props.theme} currentBook={this.props.currentBook} />
            );
        }
    }

    /**
     * Zoom de alejamiento para candlestick, en porcentaje de 10% -> 100% máximo
     */
    zoomIn() {
        let z = this.state.zoom + 10;
        if ( z > 100 ) z = 100;
        this.setState({zoom: z});
    }

    /** 
     * Zoom de acercamiento para candlestick, en porcentaje 100% -> 10% minimo
    */
    zoomOut() {
        let z = this.state.zoom - 10;
        if ( z < 10 ) z = 10;
        this.setState({zoom: z});
    }

    /**
     * Vista del componente general, seleccion de grafica candlestick o deepmarket
     */
    render () {
        return (
            <div style={{height: '340px',  }}>
                
                    <div style={{ position: 'relative', left: '0px', paddingLeft: '10px', display: 'inline-block', width:'100%', paddingTop: '10px'}}>
                        <div style={{display: 'inline-block' , }}>

                            <Select
                                onChange={(v) => this.setValue(v)}
                                optionComponent={GraphicOption}
                                options={this.graphics}
                                value={this.state.value}
                                valueComponent={GraphicValue}
                                searchable={false}
                                arrowRenderer={this.arrowRenderer}
                                clearable={false}

                                style={{ width: '5em' ,   backgroundColor: this.props.theme.bodyExchangeColor, outline: 'none', fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px' }}

                                menuStyle={{ backgroundColor: this.props.theme.bodyExchangeColor, outline: 'none', fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px' }}

                                menuContainerStyle = {{ backgroundColor: this.props.theme.bodyExchangeColor, outline: 'none', fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px' }}
                            />

                           
                        </div>

                        {this.getOptionHeader()}
                    </div>
                
                    <div id="canvasChart" style={{height: '300px'}} ref={this.myRefChart}>
                        {this.drawChart()}
                    </div>
            </div>
        );
    }

    /**
     * Set el valor del spead para la grafica Deep Market
     * 
     * @param {input type=[range] e 
     */
    setSpead(e) {
        this.setState({spead: e.target.value});
    }


    /**
    * 
    * Genera la barra de herramientas dependiendo si es para CandleStick o DeepMarket
    * 
    */
    getOptionHeader () {
        if (this.state.graphic === 'candles') {
            //toolbar para candlestick
            return (
            <React.Fragment>

                <div style={{display: 'inline-block', top: '12px', position: 'absolute'}}>
                    <span style={{display: 'inline-block', paddingLeft: '1em', paddingRight: '1em'}}>Periodo</span>
                    <div style={{display: 'inline-block' , }}>
                        <select style={{WebkitAppearance: 'none', width: '6em',  outline: 'none', padding: '3px',
                                background: 'url(' + DropDown + ') 0 0 no-repeat', backgroundSize: '0.5em', backgroundColor: this.props.theme.bodyExchangeColor,
                                backgroundPositionY: '0.5em', backgroundPositionX: '4.5em', color: this.props.theme.foreground, fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px',}} onChange={(e)=>this.changePeriod(e)}>
                            <option value='1month'>1 Mes</option>
                            <option value='3months'>3 Meses</option>
                            <option value='1year'>1 A&ntilde;o</option>
                        </select>
                    </div>
                    <span style={{display: 'inline-block', paddingLeft: '1em', paddingRight: '1em'}}>Intervalo</span>
                    <div style={{display: 'inline-block', }}>
                        <select style={{WebkitAppearance: 'none',   width: '6em',  outline: 'none', padding: '3px',
                                background: 'url(' + DropDown + ') 0 0 no-repeat', backgroundSize: '0.5em', backgroundColor: this.props.theme.bodyExchangeColor,
                                backgroundPositionY: '0.5em', backgroundPositionX: '4.5em', color: this.props.theme.foreground, fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px' }}>
                            <option value='1dia'>1 D&iacute;a</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'inline-block', position:'relative',  float: 'right', paddingRight: '2em', }}>
                    <button ref={this.buttonLess} style={{
                        appearance: 'none', 
                        WebkitAppearance: 'none',
                        borderTopLeftRadius: '15px',
                        borderBottomLeftRadius: '15px',
                        textDecoration: 'none',
                        border: '1px solid',
                        borderColor: this.props.theme.gray,
                        backgroundColor: this.state.colorButton,
                        color: this.state.textColor,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        outline: 'none',
                    }} onMouseDown={() => this.down(this.buttonLess) } onMouseUp={ () => this.up(this.buttonLess) } onClick={()=>this.zoomIn()}> - </button>

                    <button ref={this.buttonMore} style={{
                        appearance: 'none', 
                        WebkitAppearance: 'none',
                        borderTopRightRadius: '15px',
                        borderBottomRightRadius: '15px',
                        textDecoration: 'none',
                        border: '1px solid',
                        borderColor: this.props.theme.gray,
                        backgroundColor: this.state.colorButton,
                        color: this.state.textColor,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        outline: 'none',
                    }} onMouseDown={() => this.down(this.buttonMore) } onMouseUp={ () => this.up(this.buttonMore) } onClick={()=>this.zoomOut()} > + </button>
                </div>
            </React.Fragment>);
        } else {
            //toolbar para deepmarket
            return (
                <React.Fragment>
                    <div style={{ display: 'inline-block', position:'relative',  float: 'right', paddingRight: '2em', }}>
                        <input type="range" min="1" max="100" step="1" onChange={(e)=>this.setSpead(e)} value={this.state.spead}/>
                    </div>
                </React.Fragment>
            );  
        }
    }

}

/**
 * Consume el contexto BookContext
 */
export default props => (
  <BookContext.Consumer>
      { currentBook => 
        <GraphicExchange {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);