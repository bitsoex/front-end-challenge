import React from 'react'
import BookContext from './BookContext'

class Traders extends React.Component {

    render () {
        return (
            <div> Traders {this.props.currentBook}</div>
        );
    }
}

export default props => (
  <BookContext.Consumer>
      { currentBook => <Traders {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);