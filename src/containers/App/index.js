import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { setBooks, setSelectedBook } from 'actions'

import NetworkOperation from 'lib/NetworkOperation'
import Nav from 'components/Nav'
import Dashboard from 'containers/Dashboard/Loadable'

class App extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      setBooks: PropTypes.function,
      setSelectedBook: PropTypes.function
    }),
    books: PropTypes.array,
    setSelectedBook: PropTypes.object,
    selectedBook: PropTypes.object
  }

  componentDidMount() {
    NetworkOperation.getTicker()
      .then(({ data: { payload } }) => {
        const selectedBook = payload[0]

        this.props.actions.setBooks(payload)
        this.props.actions.setSelectedBook(selectedBook)
      })
      .catch(console.error)
  }

  render() {
    const {
      props: {
        books,
        selectedBook,
        actions: { setSelectedBook }
      }
    } = this

    if (Object.keys(selectedBook).length === 0) {
      return <div className="loading">Loading</div>
    }

    return (
      <div id="app">
        <Helmet>
          <title>Bitso Exchange</title>
        </Helmet>
        <Nav
          books={books}
          onBookSelect={setSelectedBook}
          selectedBook={selectedBook}
        />
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setBooks: books => dispatch(setBooks(books)),
      setSelectedBook: book => dispatch(setSelectedBook(book))
    }
  }
}

function mapStateToProps({ books, selectedBook }) {
  return {
    books,
    selectedBook
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
