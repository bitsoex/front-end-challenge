/**
 *
 * Home
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
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
import * as ALL_ACTIONS from 'actions'

import './style.less'

class Home extends PureComponent {
  static propTypes = {
    bitso: PropTypes.shape({
      selectedBook: PropTypes.object
    }),
    actions: PropTypes.object
  }

  componentDidMount() {
    const book = this.props.selectedBook.book
    this.setupBook(book)
  }

  componentDidUpdate({ selectedBook: { book: prevBook } }) {
    const book = this.props.selectedBook.book
    if (book !== prevBook) {
      this.setupBook(book)
    }
  }

  setupBook = book => {
    if (this.websocket) {
      this.websocket.close()
    }

    NetworkOperation.getChartData({ book, period: '1month' }).then(
      ({ data }) => {
        console.log('')
        this.props.actions.setChartData(data)
      }
    )

    NetworkOperation.getTrades({ book, limit: 39 })
      .then(({ data: { payload } }) => {
        this.props.actions.setTransactions(payload)
        // this.setState(({ data }) => {
        //   return {
        //     data: data.set('transactions', payload)
        //   }
        // })
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
    console.log(type, payload)
    switch (type) {
      case 'transactions':
        payload && this.props.actions.setTransactions(payload)
        break
      case 'orders':
        payload && this.props.actions.setOrders(payload)
        break
      default:
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__main-container">
          <Transactions />
          <div className="realtime-container">
            <Graph />
            <div className="orders-wrapper">
              <Orders type="bids" title="Posturas de compra" />
              <Orders type="asks" title="Posturas de venta" />
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const ACTIONS = bindActionCreators(ALL_ACTIONS, dispatch)
  return {
    dispatch,
    actions: ACTIONS
  }
}

function mapStateToProps({ selectedBook }) {
  return {
    selectedBook
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
