import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment-timezone'
// import classnames from 'classnames'

import TheHeader from '../../components/TheHeader'
import TheMarkets from '../../components/TheMarkets'
import Table from '../../components/ui/Table'

import { purchasePositionData } from '../../../.hardcode'

import { getLatestTrades as getLatestTradesAction } from '../../store/actions/exchange'
import { floatStringToLocaleString } from '../../lib/utils'

import './index.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: false
    }
  }

  componentWillMount () {
    this.setState({ loading: true })
    this.props.getLatestTrades().then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false })
    })
  }

  componentWillUpdate (nextProps, nextState) {
    const update = nextProps.selectedBook.book !== this.props.selectedBook.book
    if (update) {
      this.setState({ loading: true })
      this.props.getLatestTrades(nextProps.selectedBook.book).then(payload => {
        this.setState({ loading: false })
      }).catch(error => {
        console.error(error)
        this.setState({ loading: false })
      })
    }
  }

  lastTradesColumns () {
    const [ type, currency ] = this.props.selectedBook.book.split('_')

    return [
      {
        header: 'hora',
        className: 'time',
        accessor: (row) => moment(row.createdAt).tz('America/Mexico_City').format('hh:mm:ss')
      },
      {
        header: <div className='last-trades-header'><span>{currency}</span>precio</div>,
        className: 'price',
        accessor: (row) => (
          <span className={row.makerSide}>
            {floatStringToLocaleString(row.price)}
          </span>
        )
      },
      {
        header: <div className='last-trades-header'><span>{type}</span>monto</div>,
        className: 'amount',
        accessor: 'amount'
      }
    ]
  }

  positionsColumns () {
    const [ type, currency ] = this.props.selectedBook.book.split('_')

    return [
      {
        header: '',
        className: 'percent',
        accessor: (row) => (
          <div className='percent' style={{ width: `${row.percent * 100}%` }} />
        )
      },
      {
        header: 'sum',
        accessor: 'sum'
      },
      {
        header: <div className='btc-amount'><span>{type}</span>monto</div>,
        className: 'amount',
        accessor: 'btcAmount'
      },
      {
        header: <div className='mxn-value'><span>{currency}</span>valor</div>,
        className: 'mxn-value',
        accessor: (row) => row.mxnValue.toLocaleString({ style: 'currency', currency: currency, minimumFractionDigits: 2 })
      },
      {
        header: <div className='mxn-price'><span>{currency}</span>precio</div>,
        className: 'mxn-price',
        accessor: (row) => row.mxnPrice.toLocaleString({ style: 'currency', currency: currency, minimumFractionDigits: 2 })
      }
    ]
  }

  purshasePositionHeader () {
    const bid = floatStringToLocaleString(this.props.selectedBook.bid)
    const currency = this.props.selectedBook.book.split('_')[1]

    return (
      <div className='purchase-position-header'>
        <div className='title'>posturas de compra</div>
        <div className='average'>
          <span>{currency}</span>
          bid {bid}
        </div>
      </div>
    )
  }

  sellPositionHeader () {
    const ask = floatStringToLocaleString(this.props.selectedBook.ask)
    const currency = this.props.selectedBook.book.split('_')[1]

    return (
      <div className='sell-position-header'>
        <div className='average'>
          {ask} ask
          <span>{currency}</span>
        </div>
        <div className='title'>posturas de venta</div>
      </div>
    )
  }

  render () {
    const purshasePositionHeader = this.purshasePositionHeader()
    const sellPositionHeader = this.sellPositionHeader()
    const lastTradesColumns = this.lastTradesColumns()
    const purchasePositionColumns = this.positionsColumns()
    const sellPositionColumns = this.positionsColumns().reverse()

    return (
      <div className='page'>
        <TheHeader page={this.props.page} />
        <main className='exchange'>
          <Table
            className='last-trades'
            header='últimos trades'
            columns={lastTradesColumns}
            data={this.props.latestTrades}
            loading={this.state.loading}
          />
          <div className='positions'>
            <Table
              className='purchase-position'
              header={purshasePositionHeader}
              columns={purchasePositionColumns}
              data={purchasePositionData}
              loading={this.state.loading}
            />
            <Table
              className='sell-position'
              header={sellPositionHeader}
              columns={sellPositionColumns}
              data={purchasePositionData}
              loading={this.state.loading}
            />
          </div>
          <TheMarkets />
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ ticker, trades }) => ({
  latestTrades: trades.latest,
  selectedBook: ticker.current
})

const mapDispatchToProps = (dispatch) => ({
  getLatestTrades: bindActionCreators(getLatestTradesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
