import React from 'react'

import ThemeContext from './ThemeContext'
import BookContext from './BookContext'
import Ticker from './Ticker'
import Markets from './Markets';

import Traders  from './Traders'
import GraphicExchange from './GraphicExchange'
import OrderBooks from './OrderBooks'

/**
 * 
 * Componente que controla el cambio de los books disponibles, 
 * Exchange provee del contexto BookContext para todos los componentes internos: Traders, GraphicExchange y OrderBooks
 * 
 */
class Exchange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
            //book por default btc_mxn
            currentBook : 'btc_mxn'
        }
    }

    /**
     * 
     * Inicia los books disponibles
     * 
     */
    componentWillMount() {

        fetch ('https://api.bitso.com/v3/available_books')
         .then ( (response) => {
            return response.json();
         })
         .then( (books) => {
            this.setState ({
                books: books.payload,
                currentBook: books.payload[0].book
            })
         })
    }

    /**
     * 
     * Función para soporte de los elementos option de los books disponibles
     * 
     */
    createOptions() {
        let options = [];
        for (let i = 0; i < this.state.books.length; i++) {
            options.push(<option key={this.state.books[i].book} value={this.state.books[i].book} >{this.state.books[i].book.toUpperCase().replace(/_/g,'/')}</option>);
        }
        return options;
    }

    /**
     * 
     * Funcio soporte para el cambio de book disponible
     * 
     */
    changeBook (e) {
        this.setState({currentBook : e.target.value})
    }


    /**
     * 
     * Genera la vista del componente, consume el tema y lo propaga a traves de los componentes hijos,
     * tambien provee del book seleccionado para actualiza Ticker, Traders, GraphicExchange y OrderBook
     * 
     */
    render () {
        return(
            <ThemeContext.Consumer>
            {theme => (
                <BookContext.Provider value={this.state.currentBook} >
                    <div id="headerExchange" className='headerExchange'>
                        <select type="select" onChange={this.changeBook.bind(this)} style={{ backgroundColor: theme.background, color: theme.greenLight, 
                            outline: 'none', border: '0px'}}>
                            {this.createOptions()}
                        </select>
                        <Ticker theme={theme} mobile={this.props.mobile} />
                    </div>
                    <div style={{ width: '100%' , height: '2px',  backgroundColor: '#1f252c' }}></div>
                    <div id="bodyExchange" style={{ backgroundColor: theme.bodyExchangeColor, position: 'absolute', width: '100%'}}>
                        <div style={{
                            position: this.props.mobile?'relative':'absolute',
                            top: '0',
                            width: 'auto',
                            left: this.props.mobile?'0px':'270px',
                            display: 'inline-block',
                        }}>
                            <GraphicExchange theme={theme} widthScreen={this.props.widthScreen} mobile={this.props.mobile} />
                            <OrderBooks theme={theme}  />
                        </div>
                        <Traders theme={theme} books={this.state.books} mobile={this.props.mobile} />
                        <Markets theme={theme} books={this.state.books} />
                    </div>
                </BookContext.Provider>
            )}
            </ThemeContext.Consumer>
        );
    }
}

export default Exchange;