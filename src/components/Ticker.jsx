import React from 'react'
import BookContext from './BookContext'

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
        console.info ('mount:');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentBook !== this.props.currentBook) 
            this.updateTicker();
    }

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


    render () {

        return (
            <div id="headerTicker" className='headerTicker' >
                <span> Volumen 24 hrs. </span>
                <span> {this.state.volume} </span>
                <span> Max. </span>
                <span> {this.state.high} </span>
                <span> Min. </span>
                <span> {this.state.low}</span>
                <span> Variación </span>
                <span> {this.state.var} </span>
            </div>
        )
    }

}

export default props => (
  <BookContext.Consumer>
      { currentBook => <Ticker {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);

// export default Ticker