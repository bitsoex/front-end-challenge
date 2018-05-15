import React from 'react'
import BookContext from './BookContext'

class GraphicExchange extends React.Component {

    render () {
        return (
            <div> GraphicExchange {this.props.currentBook} </div>
        );
    }
}

export default props => (
  <BookContext.Consumer>
      { currentBook => <GraphicExchange {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);