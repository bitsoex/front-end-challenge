import React from 'react'

import BookContext from './BookContext'

import RowTrader from './RowTrader'

/**
 * 
 * Componente que visualiza la lista de ultimos traders del book seleccionado
 * 
 */
class Traders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            traders: [],
            currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
            coin: this.props.currentBook.substr(0, 3).toUpperCase(),
        };

    }

    /** 
     * 
     * Componete montando, inicia la tabla de traders
     * 
    */
    componentDidMount() {
        this.updateTraders();
    }

    /** 
     * 
     * Componete para actualiza cuando otro book del Exchange es seleccionado 
     * 
    */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentBook !== this.props.currentBook) 
            this.updateTraders();
    }
    
    /**
     * 
     * Actualiza los datos de la tabla de traders desde Bitso API
     * 
     */
    updateTraders() {
        fetch ('https://api.bitso.com/v3/trades/?book=' + this.props.currentBook)
         .then ( (response) => {
            return response.json();
         })
         .then( (traders) => {
            this.setState ({
                traders: traders.payload,
                currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
                coin: this.props.currentBook.substr(0, 3).toUpperCase(),
            })
         })
    }

    /**
     * 
     * Genera los componentes RowTrader por cada fila de la tabla de Traders
     */
    rows() {
        if (this.state.traders.length > 0) {
            let rows = [];
            for (let i = 0; i < this.state.traders.length; i++) {
                rows.push (<RowTrader key={i} hour={this.state.traders[i].created_at} price={this.state.traders[i].price} 
                    amount={this.state.traders[i].amount} theme={this.props.theme} makerSide={this.state.traders[i].maker_side} currency={this.state.currency} coin={this.state.coin} />);
            }
            return rows;
        } else {
            return (<div>Cargando</div>);
        }
        
    }

    /**
     * 
     * Genera la vista del componente Traders, cabeceras y cuerpo
     */
    render () {
        return (
            <div id="traders" style={{
                position: 'absolute',
                display: 'inline-block',
                left: '0px',
                width: '270px',
                top: '0px',
                border: '4px',
                backgroundColor: this.props.theme.bodyExchangeColor,
            }}>
                <div style={{backgroundColor: this.props.theme.headerTrader}}>
                    <h1 style={{ paddingLeft: '1.5em', color: this.props.theme.blueLight , marginTop: '0px', marginBottom: '0px'}} >
                        &Uacute;TIMOS TRADERS 
                    </h1>
                </div>

                <div className='headerTableTraders' style={{paddingLeft: '1.2em', paddingTop: '10px', paddingBottom: '10px', }} >
                    <div style={{display:'inline-block', width: '3em' , textAlign: 'center', color: this.props.theme.blueLight}}>HORA</div>
                    <div style={{display:'inline-block', width: '8em', textAlign: 'right', color: this.props.theme.blueLight}}>
                        <div style={{display:'inline-block', color: this.props.theme.grayDark}}>{this.state.currency}</div> PRECIO
                    </div>
                    <div style={{display:'inline-block', width: '8em', textAlign: 'right', color: this.props.theme.blueLight}}>
                        <div style={{display:'inline-block', color: this.props.theme.grayDark}}>{this.state.coin}</div> MONTO
                    </div>
                </div>

                <div className='bodyTableTraders' style={{paddingLeft: '1.2em', }} >
                    { this.rows() }
                </div>
            </div>
        );
    }
}

/**
 * 
 * Definicion del consumo del contexto BookContext
 * 
 */
export default props => (
  <BookContext.Consumer>
      { currentBook => <Traders {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);