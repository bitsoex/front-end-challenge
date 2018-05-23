import React from 'react'
import PropTypes from 'prop-types';

import BookContext from './BookContext'
import RowOrderBook from './RowOrderBook'

import NumberFormat from 'react-number-format';

class OrderBooks extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            asks : [],
            bids : [],
            msg: 'Cargando...',
            bid: 0,
            ask: 0, 
            currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
            coin: this.props.currentBook.substr(0, 3).toUpperCase(),
        };
    }

    componentDidMount() {
        this.updateOrderBooks();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentBook !== this.props.currentBook) 
             this.updateOrderBooks();
    }

    updateOrderBooks() {
        fetch ('https://api.bitso.com/v3/order_book/?book=' + this.props.currentBook)
         .then ( (response) => {
            return response.json();
         })
         .then( (orderBooks) => {
            if (orderBooks.success) {

                var asksTmp = [];
                var bidsTmp = [];
                var maxAsks = 0;
                var maxBids = 0;
                var sumAsks = 0;
                var sumBids = 0;

                for (let i = 0; i < orderBooks.payload.asks.length && i < this.props.maxOrderSize; i++) {
                    maxAsks = Math.max(maxAsks, orderBooks.payload.asks[i].amount);
                }
                for (let i = 0; i < orderBooks.payload.bids.length && i < this.props.maxOrderSize; i++) {
                    maxBids = Math.max(maxBids, orderBooks.payload.bids[i].amount);
                }

                for (let i = 0; i < orderBooks.payload.asks.length && i < this.props.maxOrderSize; i++) {
                    sumAsks += parseFloat(orderBooks.payload.asks[i].amount);
                    let value = orderBooks.payload.asks[i].amount * orderBooks.payload.asks[i].price;
                    let length = orderBooks.payload.asks[i].amount / maxAsks;
                    asksTmp.push( {length: length, sum: sumAsks, amount: orderBooks.payload.asks[i].amount, value: value, price: orderBooks.payload.asks[i].price} );
                }
                for (let i = 0; i < orderBooks.payload.bids.length && i < this.props.maxOrderSize; i++) {
                    sumBids += parseFloat(orderBooks.payload.bids[i].amount);
                    let value = orderBooks.payload.bids[i].amount * orderBooks.payload.bids[i].price;
                    let length = orderBooks.payload.bids[i].amount / maxBids;
                    bidsTmp.push( {length: length, sum: sumBids, amount: orderBooks.payload.bids[i].amount, value: value, price: orderBooks.payload.bids[i].price} );
                }

                
                this.setState({
                    asks: asksTmp,
                    bids: bidsTmp,
                    bid: orderBooks.payload.bids[0].price,
                    ask: orderBooks.payload.asks[0].price,
                    currency: this.props.currentBook.substr(this.props.currentBook.length-3).toUpperCase(),
                    coin: this.props.currentBook.substr(0, 3).toUpperCase(),
                    msg: '',
                });



            } else {
                this.setState ({ asks: [], bids: [], msg: 'Error en https://api.bitso.com/v3/order_book/ no es posible cargar '});
            }
         })
    }

    rowsBids () {
        if (this.state.bids.length > 0) {
            let rows = [];
            for (let i = 0; i < this.state.bids.length; i++) {
                rows.push (
                    <RowOrderBook key={i} data={this.state.bids[i]}
                        theme={this.props.theme} orderSide={'bids'} currency={this.state.currency} coin={this.state.coin} />
                );
            }
            return rows;
        } else {
            return (<div>{this.state.msg}</div>);
        }
    }

    rowsAsks() {
        if (this.state.asks.length > 0) {
            let rows = [];
            for (let i = 0; i < this.state.asks.length; i++) {
                rows.push (
                    <RowOrderBook key={i} data={this.state.asks[i]}
                        theme={this.props.theme} orderSide={'asks'} currency={this.state.currency} coin={this.state.coin} />
                );
            }
            return rows;
        } else {
            return (<div>{this.state.msg}</div>);
        }
    }

    render () {
        return (
            <div style={{margin: 'auto', width: '100%', position: 'relative', textAlign: 'center' }}>
                <div style={{width: 'auto', display: 'inline-block', margin: 'auto'}}>
                    <div title='headerBid' style={{paddingTop: '0.25em', paddingBottom: '0.25em', backgroundColor: this.props.theme.headerBid , 
                            position: 'relative'}}>

                        <span style={{ left: '0', }}>
                            <span style={{color: this.props.theme.blueLight, paddingRight: '15em', }}>POSTURAS DE COMPRA</span>
                        </span>

                        <span style={{color: this.props.theme.blueLight, display: 'inline-block', right: '0', position: 'absolute'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span>                       
                            <span style={{paddingLeft: '0.5em'}}>Bid</span>
                            <span style={{paddingLeft: '0.5em', paddingRight: '1em'}}>
                                <NumberFormat value={this.state.bid}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.state.currency==='MXN'?2:8}  />
                            </span>
                        </span>
                    </div>

                    <div title='headersBid' style={{paddingTop: '0.25em', paddingBottom: '0.25em', color: this.props.theme.grayLight}}>
                        <span style={{ width: '3em', display: 'inline-block'}}></span>
                        <span style={{ width: '3em', display: 'inline-block', textAlign: 'right'}}>SUM</span>
                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'right'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.coin} </span>
                            MONTO
                        </span>
                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'right'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span> 
                            VALOR
                        </span>
                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'right'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span> 
                            PRECIO
                        </span>
                    </div>

                    { this.rowsBids() }
                </div>
                <div style={{width: '0.5em', display: 'inline-block'}}></div>
                <div style={{width: 'auto', display: 'inline-block'}}>
                     <div title='headerAsk' style={{paddingTop: '0.25em', paddingBottom: '0.25em', backgroundColor: this.props.theme.headerAsk , position: 'relative' }} >

                        <span style={{color: this.props.theme.blueLight, display: 'inline-block', paddingRight: '20em',}} >
                            <span style={{paddingLeft: '1.5em', paddingRight: '1em'}}>
                                <NumberFormat value={this.state.ask}
                                    displayType={'text'} thousandSeparator={true} decimalScale={ this.state.currency==='MXN'?2:8}  />
                            </span>
                            <span>Ask</span>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span>
                        </span>

                        <span style={{color: this.props.theme.blueLight, display: 'inline-block', right: '0', position: 'absolute', paddingRight: '2em',}}>
                            POSTURAS DE VENTA
                        </span>
                    </div>

                    <div title='headersAsk' style={{paddingTop: '0.25em', paddingBottom: '0.25em', color: this.props.theme.grayLight, paddingLeft: '1.5em'}}>
                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'left'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span> 
                            PRECIO
                        </span>

                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'left'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.currency} </span> 
                            VALOR
                        </span>

                        <span style={{ width: '8em', display: 'inline-block', textAlign: 'left'}}>
                            <span style={{color: this.props.theme.grayDark}}> {this.state.coin} </span>
                            MONTO
                        </span>

                        <span style={{ width: '3em', display: 'inline-block', textAlign: 'left'}}>SUM</span>
                        <span style={{ width: '3em', display: 'inline-block'}}></span>
                    </div>

                    { this.rowsAsks() }
                </div>
            </div>
        );
    }
}

OrderBooks.propTypes = {
  maxOrderSize: PropTypes.number,
};

OrderBooks.defaultProps  = {
    maxOrderSize: 25,
}

export default props => (
  <BookContext.Consumer>
      { currentBook => <OrderBooks {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);