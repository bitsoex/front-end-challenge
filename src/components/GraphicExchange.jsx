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

class GraphicExchange extends React.Component {


    constructor (props) {
        super(props);

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
            graphic: 'candles',
            value: this.graphics[0],
            colorButton: this.props.theme.bodyExchangeColor,
            textColor: this.props.theme.foreground,
        };

        this.buttonLess = React.createRef();
        this.buttonMore = React.createRef();

        this.myRefChart = React.createRef();
    }

    down (r) {
        r.current.style.backgroundColor = this.props.theme.foreground;
        r.current.style.color = this.props.theme.bodyExchangeColor;
    }

    up (r) {
        r.current.style.backgroundColor = this.props.theme.bodyExchangeColor;
        r.current.style.color = this.props.theme.foreground;
    }

    
    getOptionId(value) {
        console.info (value);
        if (typeof value === "object" && typeof value.id !== "undefined") {
            return value.id;
        }

        return value;
    }

    setValue(value) {
        this.setState({value: value, graphic: value.value});
    }

    arrowRenderer () {
        return <img src={require('../imgs/icon_dropdown.svg')}  alt='dd' style={{height: '0.75em', width: '0.75em'}}/>
    }

    drawChart () {
        if (this.state.graphic === 'candles') {
            if (this.myRefChart.current !== null) {

                const w = this.props.widthScreen - 270 - 30;
                console.info ('this.myRefChart.current.clientWidth: ' + this.myRefChart.current.clientWidth + ' Screen: ' + this.props.widthScreen + ' w: ' + w);
                
                return (
                    <CandlesChart h={300} 
                        w={w} 
                        theme={this.props.theme} period={'1month'} intervalo={'1dia'} currentBook={this.props.currentBook} />
                );
            }
        } else {

        }
    }

    render () {

        return (
            
            <div style={{height: '50vh',  }}>
                
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

    getOptionHeader () {
        if (this.state.graphic === 'candles') {
            return (
            <React.Fragment>
                <div style={{display: 'inline-block', top: '12px', position: 'absolute'}}>
                    <span style={{display: 'inline-block', paddingLeft: '1em', paddingRight: '1em'}}>Periodo</span>
                    <div style={{display: 'inline-block' , }}>
                        <select style={{WebkitAppearance: 'none', width: '6em',  outline: 'none', padding: '3px',
                                background: 'url(' + DropDown + ') 0 0 no-repeat', backgroundSize: '0.5em', backgroundColor: this.props.theme.bodyExchangeColor,
                                backgroundPositionY: '0.5em', backgroundPositionX: '4.5em', color: this.props.theme.foreground, fontWeight: 'lighter',
                                border: '1px solid ' + this.props.theme.gray, borderRadius: '15px',}}>
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
                    }} onMouseDown={() => this.down(this.buttonLess) } onMouseUp={ () => this.up(this.buttonLess) } > - </button>

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
                    }} onMouseDown={() => this.down(this.buttonMore) } onMouseUp={ () => this.up(this.buttonMore) } > + </button>
                </div>
            </React.Fragment>);
        } else {
          return (<div></div>);  
        }
    }

}

export default props => (
  <BookContext.Consumer>
      { currentBook => 
        <GraphicExchange {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);