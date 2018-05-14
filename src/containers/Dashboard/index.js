/**
 *
 * Home
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  tradeSuscribe,
  // DIFF_ordersSuscribe,
  ordersSuscribe
} from 'lib/constants'

import NetworkOperation from 'lib/NetworkOperation'
import Sidebar from 'components/Sidebar'
import Transactions from 'components/Transactions'
import Orders from 'components/Orders'
import Graph from 'components/Graph'

import './style.less'

class Home extends PureComponent {
  static propTypes = {
    bitso: PropTypes.shape({
      selectedBook: PropTypes.object
    })
  }

  state = {
    selectedBook: 'BTC',
    transactions: [],
    orders: {
      bids: [],
      asks: []
    },
    orderAsks: []
  }

  componentDidMount() {
    const book = this.props.bitso.selectedBook.book
    this.setupBook(book)
  }

  componentDidUpdate({
    bitso: {
      selectedBook: { book: prevBook }
    }
  }) {
    const book = this.props.bitso.selectedBook.book
    if (book !== prevBook) {
      this.setupBook(book)
    }
  }

  setupBook = book => {
    this.setState({
      transactions: [],
      orders: {
        bids: [],
        asks: []
      },
      orderAsks: []
    })

    if (this.websocket) {
      this.websocket.close()
    }

    NetworkOperation.getTrades({ book, limit: 39 })
      .then(({ data: { payload } }) => {
        this.setState({
          transactions: payload
        })
      })
      .catch(error => {
        console.log(error)
      })

    this.websocket = new WebSocket('wss://ws.bitso.com')
    this.websocket.onopen = () => {
      this.websocket.send(tradeSuscribe(book))
      // this.websocket.send(DIFF_ordersSuscribe)
      this.websocket.send(ordersSuscribe(book))
    }

    this.websocket.onmessage = this.onMessage
  }

  onMessage = ({ data: stringData }) => {
    const { type, payload } = JSON.parse(stringData)
    // console.log(type, payload)
    switch (type) {
      case 'transactions':
        payload &&
          this.setState(prev => ({
            transactions: prev.transactions.concat(payload)
          }))
        break
      case 'orders':
        payload &&
          this.setState({
            orders: payload
          })
        break
      default:
    }
  }

  render() {
    const {
      state: { transactions, orders }
    } = this
    return (
      <div className="dashboard">
        <div className="dashboard__main-container">
          <Transactions transactions={transactions} />
          <div className="realtime-container">
            <Graph />
            <div className="orders-wrapper">
              <Orders orders={orders.bids} title="Posturas de compra" />
              <Orders orders={orders.asks} title="Posturas de venta" />
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    )
  }
}

function mapStateToProps({ books, selectedBook }) {
  return { bitso: { books, selectedBook } }
}

export default connect(mapStateToProps)(Home)
