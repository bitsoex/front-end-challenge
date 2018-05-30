import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import queryString from 'query-string'
import snakeCase from 'lodash/snakeCase'

import TheHeader from '../../components/TheHeader'
import TheMarkets from '../../components/TheMarkets'
import PositionsHeader from '../../components/PositionsHeader'
import Table from '../../components/ui/Table'
import Dropdown from '../../components/ui/Dropdown'
import CandlestickChart from '../../components/ui/CandlestickChart'
import DeepChart from '../../components/ui/DeepChart'

import { setError as setErrorAction, setLoading as setLoadingAction } from '../../store/actions/ui'
import {
  getLatestTrades as getLatestTradesAction,
  getOrderBook as getOrderBookAction,
  getTickerTimeline as getTickerTimelineAction,
  getAvailableBooks as getAvailableBooksAction,
  getTickerData as getTickerDataAction
} from '../../store/actions/exchange'

import { floatStringToLocaleString } from '../../lib/utils'
import {
  createAsksColumns,
  createBidsColumns,
  createLastTradesColumns
} from '../../lib/exchange'

import { DEFAULT_BOOK } from '../../constans'
import exchangeConstants from '../../constans/exchange'

import './index.css'

class Home extends Component {
  componentWillMount () {
    const book = this.props.match.params.book || DEFAULT_BOOK
    this.getData(snakeCase(book))
  }

  componentWillUpdate (nextProps, nextState) {
    let { period: oldPeriod } = queryString.parse(this.props.location.search)
    let { period: nextPeriod } = queryString.parse(nextProps.location.search)
    let { book: oldBook } = this.props.match.params
    let { book: nextBook } = nextProps.match.params

    oldPeriod = oldPeriod || exchangeConstants.defaultPeriod
    nextPeriod = nextPeriod || exchangeConstants.defaultPeriod
    oldBook = oldBook ? snakeCase(oldBook) : DEFAULT_BOOK
    nextBook = nextBook ? snakeCase(nextBook) : DEFAULT_BOOK

    const updateData = oldBook !== nextBook
    const updateTimeline = oldPeriod !== nextPeriod

    if (updateData) this.getData(nextBook)
    if (updateTimeline) this.props.getTickerTimeline(nextBook, nextPeriod)
  }

  getData (book, period) {
    this.props.setLoading(true)
    Promise.all([
      this.props.getLatestTrades(book),
      this.props.getOrderBook(book),
      this.props.getTickerTimeline(book, period),
      this.props.getAvailableBooks(),
      this.props.getTickerData(book)
    ]).then(payload => {
      this.props.setLoading(false)
      this.props.setError({ value: false, message: '' })
    }).catch(error => {
      console.error(error)
      this.props.setLoading(false)
      this.props.setError({ value: true, message: error.message })
    })
  }

  render () {
    if (this.props.loading || this.props.error) {
      return (
        <div className='page'>
          <main className={classnames('exchange', { loading: this.props.loading })}>
            <h2 className='error'>
              Ocurrio un error al tratar de obtener la información del servidor, vuelve a intentarlo en unos momentos
            </h2>
          </main>
        </div>
      )
    }

    const { chart = 'candlestick', period = exchangeConstants.defaultPeriod } = queryString.parse(this.props.location.search)

    const book = this.props.match.params.book || DEFAULT_BOOK
    const [ type, currency ] = book.split('-')

    const bidNumer = currency === 'mxn'
      ? floatStringToLocaleString(this.props.selectedBook.bid)
      : parseFloat(this.props.selectedBook.bid)
    const askNumer = currency === 'mxn'
      ? floatStringToLocaleString(this.props.selectedBook.ask)
      : parseFloat(this.props.selectedBook.ask)

    const bidHeader = (
      <PositionsHeader
        type='bid'
        currency={currency}
        title='posturas de compra'
        number={bidNumer}
        className='bid-header'
      />
    )

    const askHeader = (
      <PositionsHeader
        type='ask'
        currency={currency}
        title='posturas de venta'
        number={askNumer}
        className='ask-header'
      />
    )

    const lastTradesColumns = createLastTradesColumns(type, currency)
    const bidsColumns = createBidsColumns(type, currency, this.props.orderBook.bidsSum)
    const asksColumns = createAsksColumns(type, currency, this.props.orderBook.asksSum)

    const chartSelectorOptions = exchangeConstants.chartOptions.filter(option => option.value !== chart)
    const chartSelectorText = exchangeConstants.chartOptions.find(option => option.value === chart).label

    const periodLabel = exchangeConstants.periodOptions.find(periodOption => periodOption.value === period).label

    const to = {
      name: 'exchange',
      query: { period, chart }
    }

    return (
      <div className='page'>
        <TheHeader page={this.props.page} book={snakeCase(book)} to={to} />
        <main className='exchange'>
          <Table
            className='last-trades'
            header='últimas transacciones'
            columns={lastTradesColumns}
            data={this.props.latestTrades}
            loading={this.props.loading}
          />
          <div className='middle-section'>
            <div className='charts'>
              <div className='options'>
                <Dropdown
                  options={chartSelectorOptions}
                  text={chartSelectorText}
                  onChange={(option) => this.props.history.push({
                    pathname: `/exchange/${book}`,
                    search: queryString.stringify({ period, chart: option.value })
                  })}
                  className='charts-options'
                />
                {chart === 'candlestick' && (
                  <div className='option'>
                    Periodo
                    <Dropdown
                      options={exchangeConstants.periodOptions}
                      text={periodLabel}
                      onChange={(option) => this.props.history.push({
                        pathname: `/exchange/${book}`,
                        search: queryString.stringify({ period: option.value, chart })
                      })}
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
                {chart === 'candlestick' ? (
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
                loading={this.props.loading}
              />
              <Table
                className='ask'
                header={askHeader}
                columns={asksColumns}
                data={this.props.orderBook.asks}
                loading={this.props.loading}
              />
            </div>
          </div>
          <TheMarkets />
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ ticker, trades, orderBook, ui }) => ({
  latestTrades: trades.latest,
  selectedBook: ticker.current,
  tickerTimeline: ticker.timeline,
  loading: ui.loading,
  error: ui.error,
  errorMessage: ui.errorMessage,
  orderBook
})

const mapDispatchToProps = (dispatch) => ({
  getLatestTrades: bindActionCreators(getLatestTradesAction, dispatch),
  getOrderBook: bindActionCreators(getOrderBookAction, dispatch),
  getTickerTimeline: bindActionCreators(getTickerTimelineAction, dispatch),
  getAvailableBooks: bindActionCreators(getAvailableBooksAction, dispatch),
  setError: bindActionCreators(setErrorAction, dispatch),
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  getTickerData: bindActionCreators(getTickerDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
