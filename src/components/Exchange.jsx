import React from 'react'

import ThemeContext from './ThemeContext'
import BookContext from './BookContext'
import Ticker from './Ticker'
import Markets from './Markets';

import Traders  from './Traders'
import GraphicExchange from './GraphicExchange'
import OrderBooks from './OrderBooks'


class Exchange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
            currentBook : 'btc_mxn'
        }
    }

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

    createOptions() {
        let options = [];
        for (let i = 0; i < this.state.books.length; i++) {
            options.push(<option key={this.state.books[i].book} value={this.state.books[i].book} >{this.state.books[i].book.toUpperCase().replace(/_/g,'/')}</option>);
        }
        return options;
    }

    changeBook (e) {
        this.setState({currentBook : e.target.value})
    }

    render () {
        return (
            <ThemeContext.Consumer>
             {theme => (
                <BookContext.Provider value={this.state.currentBook} >
                    <div id="headerExchange" className='headerExchange'>
                        <select type="select" onChange={this.changeBook.bind(this)} style={{ backgroundColor: theme.background, color: theme.greenLight, 
                            outline: 'none', border: '0px'}}>
                            {this.createOptions()}
                        </select>
                        <Ticker theme={theme} />
                    </div>
                    <div style={{ width: '100%' , height: '2px',  backgroundColor: '#1f252c' }}></div>

                    <div id="bodyExchange" style={{ backgroundColor: theme.bodyExchangeColor, position: 'relative'}}>
                        <Traders />
                        <GraphicExchange />
                        <OrderBooks />
                        <Markets theme={theme} books={this.state.books} />
                    </div>
                </BookContext.Provider>
             )}
            </ThemeContext.Consumer>
        )
    }
}

export default Exchange;