import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import queryString from 'query-string'
import snakeCase from 'lodash/snakeCase'
import get from 'lodash/get'

import TheHeader from '../../components/TheHeader'
import TheMarkets from '../../components/TheMarkets'
import PositionsHeader from '../../components/PositionsHeader'
import Table from '../../components/ui/Table'
import Dropdown from '../../components/ui/Dropdown'
import CandlestickChart from '../../components/ui/CandlestickChart'
import DeepChart from '../../components/ui/DeepChart'
import ErrorBoundary from '../../components/ui/ErrorBoundary'

import { setError as setErrorAction, setLoading as setLoadingAction } from '../../store/actions/ui'
import {
  getLatestTrades as getLatestTradesAction,
  getOrderBook as getOrderBookAction,
  getTickerTimeline as getTickerTimelineAction,
  getAvailableBooks as getAvailableBooksAction,
  getTickerData as getTickerDataAction,
  getMarketsData as getMarketsDataAction
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
    const book = snakeCase(get(this.props, 'match.params.book', DEFAULT_BOOK))
    let { period = exchangeConstants.defaultPeriod } = queryString.parse(this.props.location.search)
    this.getExchangeData(book, period)
    this.props.getMarketsData({ sort: 'asc' })
  }

  componentWillUpdate (nextProps, nextState) {
    const {
      period: oldPeriod = exchangeConstants.defaultPeriod
    } = queryString.parse(this.props.location.search)
    const {
      period: nextPeriod = exchangeConstants.defaultPeriod
    } = queryString.parse(nextProps.location.search)

    let oldBook = snakeCase(get(this.props.match.params, 'book', DEFAULT_BOOK))
    let nextBook = snakeCase(get(nextProps.match.params, 'book', DEFAULT_BOOK))

    const updateData = oldBook !== nextBook
    const updateTimeline = oldPeriod !== nextPeriod

    if (updateData) this.getExchangeData(nextBook, nextPeriod)
    if (updateTimeline && !updateData) this.props.getTickerTimeline(nextBook, nextPeriod)
  }

  getExchangeData (book, period) {
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
              Ocurrio un error al tratar de obtener la información del servidor,
               vuelve a intentarlo en unos momentos y verifica que tengas desactivada la política
                de Access-Control-Allow-Origin CORS
            </h2>
          </main>
        </div>
      )
    }

    const {
      chart = 'candlestick',
      period = exchangeConstants.defaultPeriod
    } = queryString.parse(this.props.location.search)

    const book = this.props.match.params.book
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

    const spread = this.props.orderBook.bidsSum / this.props.orderBook.asksSum

    const chartSelectorOptions = exchangeConstants.chartOptions.filter(option => option.value !== chart)
    const chartSelectorText = exchangeConstants.chartOptions.find(option => option.value === chart).label

    const periodLabel = exchangeConstants.periodOptions.find(periodOption => periodOption.value === period).label

    const to = {
      name: 'exchange',
      query: { period, chart }
    }

    return (
      <div className={classnames('page', this.props.theme)}>
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
                <div className='right-options'>
                  {chart === 'deep' && (
                    <h3 className='spread'>{spread} {currency}</h3>
                  )}
                  {/* <div className='zoom'>
                    <i className='material-icons'>remove</i>
                    <i className='material-icons'>add</i>
                  </div> */}
                </div>
              </div>
              <div className='chart'>
                {chart === 'candlestick' ? (
                  <ErrorBoundary>
                    <CandlestickChart
                      data={this.props.tickerTimeline}
                      currency={currency}
                      coin={type}
                    />
                  </ErrorBoundary>
                ) : (
                  <ErrorBoundary>
                    <DeepChart
                      bids={this.props.orderBook.bids}
                      asks={this.props.orderBook.asks}
                      currency={currency}
                      coin={type}
                    />
                  </ErrorBoundary>
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
  theme: ui.theme,
  orderBook
})

const mapDispatchToProps = (dispatch) => ({
  getLatestTrades: bindActionCreators(getLatestTradesAction, dispatch),
  getOrderBook: bindActionCreators(getOrderBookAction, dispatch),
  getTickerTimeline: bindActionCreators(getTickerTimelineAction, dispatch),
  getAvailableBooks: bindActionCreators(getAvailableBooksAction, dispatch),
  setError: bindActionCreators(setErrorAction, dispatch),
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  getTickerData: bindActionCreators(getTickerDataAction, dispatch),
  getMarketsData: bindActionCreators(getMarketsDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
