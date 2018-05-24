import React from 'react'

import NumberFormat from 'react-number-format';

import BookContext from './BookContext'

/**
 * 
 * Componente que muestra los datos Ticker del book, se muestra:
 * Volumen 24 hrs
 * Max
 * Min
 * Variacion
 * Se modifican los datos dependiendo del book seleccionado en Exchange 
 */

class Ticker extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            volume : 0.0,
            high : 0.0,
            low : 0.0,
            var : 0.0,
        }
    }

    componentDidMount() {
        this.updateTicker();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentBook !== this.props.currentBook) 
            this.updateTicker();
    }

    /**
     * 
     * Actualiza la información del Ticker del book seleccionado
     * 
     */
    updateTicker() {
        fetch ('https://api.bitso.com/v3/ticker/?book=' + this.props.currentBook)
         .then ( (response) => {
            return response.json();
         })
         .then( (ticker) => {
            this.setState ({
                volume : ticker.payload.volume,
                high : ticker.payload.high,
                low : ticker.payload.low,
                var : 0.0,
            })
         })
    }


    /**
     * 
     * Genera la vista del componente
     * 
     */
    render () {
        const currency = 'MXN';
        return (
            <div id="headerTicker" className='headerTicker' >

                <div style={{ display: this.props.mobile?'block':'inline-block' , paddingRight: '0.5em' }}>
                    <span style={{ fontWeight: 'bold', color: this.props.theme.grayDark }}  > Volumen 24 hrs. </span>
                    <span style={{ color: this.props.theme.grayLight }}> 
                        <NumberFormat value={this.state.volume} 
                            displayType={'text'} thousandSeparator={true} suffix={' BTC'} /> 
                    </span>
                </div>

                <div style={{ display: this.props.mobile?'block':'inline-block' , paddingRight: '0.5em' }}>
                    <span style={{ fontWeight: 'bold', color: this.props.theme.grayDark }}> Max. </span>
                    <span style={{ color: this.props.theme.grayLight }}> 
                        <NumberFormat value={this.state.high} 
                            displayType={'text'} thousandSeparator={true} suffix={' ' + currency} prefix={'$'}/> 
                    </span>
                </div>

                <div style={{ display: this.props.mobile?'block':'inline-block' , paddingRight: '0.5em' }}>
                    <span style={{ fontWeight: 'bold', color: this.props.theme.grayDark }}> Min. </span>
                    <span style={{ color: this.props.theme.grayLight }}> 
                        <NumberFormat value={this.state.low}
                            displayType={'text'} thousandSeparator={true} suffix={' ' + currency} prefix={'$'}/> 
                    </span>
                </div>

                <div style={{ display: this.props.mobile?'block':'inline-block' , paddingRight: '0.5em' }}>
                    <span style={{ fontWeight: 'bold', color: this.props.theme.grayDark }}> Variación </span>
                    <span style={{ color: this.props.theme.grayLight }}> {this.state.var} </span>
                </div>
            </div>
        )
    }

}

export default props => (
  <BookContext.Consumer>
      { currentBook => <Ticker {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);

