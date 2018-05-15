import React from 'react'
import BookContext from './BookContext'

class OrderBooks extends React.Component {

    render () {
        return (
            <div> OrderBooks {this.props.currentBook}</div>
        );
    }
}

export default props => (
  <BookContext.Consumer>
      { currentBook => <OrderBooks {...props} currentBook={currentBook} />}
  </BookContext.Consumer>
);