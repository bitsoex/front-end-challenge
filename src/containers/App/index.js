/**
 *
 * App
 *
 */

import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import { setBooks, setSelectedBook } from 'actions'

import Nav from 'components/Nav'
import Dashboard from 'containers/Dashboard'

class App extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      setBooks: PropTypes.function,
      setSelectedBook: PropTypes.function
    }),
    bitso: PropTypes.shape({
      books: PropTypes.array,
      setSelectedBook: PropTypes.object,
      selectedBook: PropTypes.object
    })
  }

  state = {}

  componentDidMount() {
    axios.get('https://api.bitso.com/v3/available_books').then(({ data }) => {
      const { payload } = data
      this.props.actions.setBooks(payload)
      const selectedBook = payload[0]

      this.props.actions.setSelectedBook(selectedBook)
    })
  }

  componentDidUpdate() {
    const book = this.props.bitso.selectedBook.book
    this.setState({
      isLoading: true
    })
    axios
      .get(`https://api.bitso.com/v3/ticker?book=${book}`)
      .then(({ data }) => {
        console.log({ data })
      })
  }

  render() {
    const {
      props: {
        bitso: { books, selectedBook },
        actions: { setSelectedBook }
      }
    } = this

    if (Object.keys(selectedBook).length === 0) {
      return <div className="loading" />
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
  return { bitso: { books, selectedBook } }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
