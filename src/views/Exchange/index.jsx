import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment-timezone'
import range from 'lodash/range'
import classnames from 'classnames'

import TheHeader from '../../components/TheHeader'
import TheMarkets from '../../components/TheMarkets'
import Table from '../../components/ui/Table'
import Dropdown from '../../components/ui/Dropdown'
import CandlestickChart from '../../components/ui/CandlestickChart'
import DeepChart from '../../components/ui/DeepChart'

import candlestickIcon from '../../../Assets/Images/1x/icon_candles.png'
import deepIcon from '../../../Assets/Images/1x/icon_deep.png'

import {
  getLatestTrades as getLatestTradesAction,
  getOrderBook as getOrderBookAction,
  getTickerTimeline as getTickerTimelineAction
} from '../../store/actions/exchange'
import { floatStringToLocaleString } from '../../lib/utils'

import { DEFAULT_BOOK } from '../../constans'
import './index.css'

const INITIAL_RANGE = 0
const NORMALIZE_INDEX = 1

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      chart: 'deep',
      period: '1year'
    }
  }

  componentWillMount () {
    this.getData(DEFAULT_BOOK)
  }

  componentWillUpdate (nextProps, nextState) {
    const updateData = nextProps.selectedBook.book !== this.props.selectedBook.book
    const updateTimeline = nextState.period !== this.state.period
    if (updateData) this.getData(nextProps.selectedBook.book)
    if (updateTimeline) this.props.getTickerTimeline(nextProps.selectedBook.book, nextState.period)
  }

  getData (book = DEFAULT_BOOK, period = '1year') {
    this.setState({ loading: true, period })
    Promise.all([
      this.props.getLatestTrades(book),
      this.props.getOrderBook(book),
      this.props.getTickerTimeline(book, period)
    ]).then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false, error: true })
    })
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
            {floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })}
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

  bidsColumns () {
    const [ type, currency ] = this.props.selectedBook.book.split('_')

    return [
      {
        header: '',
        className: 'percent is-hidden-mobile',
        accessor: (row) => <div className='percent' style={{ width: `${(row.amount * 100) / this.props.orderBook.asksSum}%` }} />
      },
      {
        header: 'sum',
        className: 'is-hidden-mobile',
        accessor: (row, index, rows) => {
          const items = range(INITIAL_RANGE, index + NORMALIZE_INDEX)
          const sum = items.reduce((reducer, item) => parseFloat(rows[item].amount) + reducer, 0)
          return floatStringToLocaleString(sum, { minimumFractionDigits: 5 })
        }
      },
      {
        header: <div className='btc-amount'><span>{type}</span>monto</div>,
        className: 'amount',
        accessor: (row) => floatStringToLocaleString(row.amount, { minimumFractionDigits: 5 })
      },
      {
        header: <div className='mxn-value'><span>{currency}</span>valor</div>,
        className: 'mxn-value',
        accessor: (row) => floatStringToLocaleString(row.amount * row.price)
      },
      {
        header: <div className='mxn-price'><span>{currency}</span>precio</div>,
        className: 'mxn-price',
        accessor: (row) => floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })
      }
    ]
  }

  asksColumns () {
    const [ type, currency ] = this.props.selectedBook.book.split('_')

    return [
      {
        header: <div className='mxn-price'><span>{currency}</span>precio</div>,
        className: 'mxn-price',
        accessor: (row) => floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })
      },
      {
        header: <div className='mxn-value'><span>{currency}</span>valor</div>,
        className: 'mxn-value',
        accessor: (row) => floatStringToLocaleString(row.amount * row.price)
      },
      {
        header: <div className='btc-amount'><span>{type}</span>monto</div>,
        className: 'amount',
        accessor: (row) => floatStringToLocaleString(row.amount, { minimumFractionDigits: 5 })
      },
      {
        header: 'sum',
        className: 'is-hidden-mobile',
        accessor: (row, index, rows) => {
          const items = range(INITIAL_RANGE, index + NORMALIZE_INDEX)
          const sum = items.reduce((reducer, item) => parseFloat(rows[item].amount) + reducer, 0)
          return floatStringToLocaleString(sum, { minimumFractionDigits: 5 })
        }
      },
      {
        header: '',
        className: 'percent is-hidden-mobile',
        accessor: (row) => (
          <div className='percent' style={{ width: `${(row.amount * 100) / this.props.orderBook.asksSum}%` }} />
        )
      }
    ]
  }

  bidHeader () {
    const bid = floatStringToLocaleString(this.props.selectedBook.bid)
    const currency = this.props.selectedBook.book.split('_')[1]

    return (
      <div className='bid-header'>
        <div className='title'>posturas de compra</div>
        <div className='average'>
          <span>{currency}</span>
          bid {bid}
        </div>
      </div>
    )
  }

  askHeader () {
    const ask = floatStringToLocaleString(this.props.selectedBook.ask)
    const currency = this.props.selectedBook.book.split('_')[1]

    return (
      <div className='ask-header'>
        <div className='average'>
          {ask} ask
          <span>{currency}</span>
        </div>
        <div className='title'>posturas de venta</div>
      </div>
    )
  }

  changeChart (option) {
    this.setState({ chart: option.value })
  }

  chartOptions = [
    {
      value: 'candlestick',
      label: <img src={candlestickIcon} alt='candlestick-chart' />
    },
    {
      value: 'deep',
      label: <img src={deepIcon} alt='deep-chart' />
    }
  ]

  periodOptions = [
    {
      value: '1month',
      label: '1m'
    },
    {
      value: '3months',
      label: '3m'
    },
    {
      value: '1year',
      label: '1y'
    }
  ]

  intervalOptions = [
    {
      value: '1hour',
      label: '1h'
    },
    {
      value: '5hours',
      label: '5h'
    },
    {
      value: '1minute',
      label: '1m'
    }
  ]

  render () {
    if (this.state.loading || this.state.error) {
      return (
        <div className='page'>
          <TheHeader page={this.props.page} />
          <main className={classnames('exchange', { loading: this.state.loading })}>
            <h2>Ocurrio un error al tratar de obtener la información del servidor, vuelve a intentarlo en unos momentos</h2>
            <TheMarkets />
          </main>
        </div>
      )
    }

    const bidHeader = this.bidHeader()
    const askHeader = this.askHeader()
    const lastTradesColumns = this.lastTradesColumns()
    const bidsColumns = this.bidsColumns()
    const asksColumns = this.asksColumns()

    const chartSelectorOptions = this.chartOptions.filter(option => option.value !== this.state.chart)
    const chartSelectorText = this.chartOptions.find(option => option.value === this.state.chart).label
    const [ type, currency ] = this.props.selectedBook.book.split('_')

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
          <div className='middle-section'>
            <div className='charts'>
              <div className='options'>
                <Dropdown
                  options={chartSelectorOptions}
                  text={chartSelectorText}
                  onChange={this.changeChart.bind(this)}
                  className='charts-options'
                />
                {this.state.chart === 'candlestick' && (
                  <div className='option'>
                    Periodo
                    <Dropdown
                      options={this.periodOptions}
                      text={this.periodOptions.find(period => period.value === this.state.period).label}
                      onChange={(option) => this.setState({ period: option.value })}
                    />
                  </div>
                )}
                {/* @TODO commented because is useless by the moment */}
                {/*
                  <div className='option'>
                    Intervalo
                    <Dropdown
                      options={this.intervalOptions}
                      text='1h'
                    />
                  </div>
                */}
                {/*
                  <div className='right-options'>
                    <div className='zoom'>
                      <i className='material-icons'>remove</i>
                      <i className='material-icons'>add</i>
                    </div>
                  </div>
                */}
              </div>
              <div className='chart'>
                {this.state.chart === 'candlestick' ? (
                  <CandlestickChart
                    data={this.props.tickerTimeline}
                    currency={currency}
                    coin={type}
                  />
                ) : (
                  <DeepChart
                    bids={this.props.orderBook.bids}
                    asks={this.props.orderBook.asks}
                    currency={currency}
                    coin={type}
                  />
                )}
              </div>
            </div>
            <div className='positions'>
              <Table
                className='bid'
                header={bidHeader}
                columns={bidsColumns}
                data={this.props.orderBook.bids}
                loading={this.state.loading}
              />
              <Table
                className='ask'
                header={askHeader}
                columns={asksColumns}
                data={this.props.orderBook.asks}
                loading={this.state.loading}
              />
            </div>
          </div>
          <TheMarkets />
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ ticker, trades, orderBook }) => ({
  latestTrades: trades.latest,
  selectedBook: ticker.current,
  tickerTimeline: ticker.timeline,
  orderBook
})

const mapDispatchToProps = (dispatch) => ({
  getLatestTrades: bindActionCreators(getLatestTradesAction, dispatch),
  getOrderBook: bindActionCreators(getOrderBookAction, dispatch),
  getTickerTimeline: bindActionCreators(getTickerTimelineAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
