import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleMarkets as toggleMarketsAction } from '../../store/actions/ui'
import {
  getMarketsData as getMarketsDataAction,
  setMarketsLoading as setMarketsLoadingAction,
  setMarketsError as setMarketsErrorAction
} from '../../store/actions/exchange'

import MarketChart from '../MarketChart'

import './index.css'
import './animations.css'

const toggleMarkets = (action) => action()

class TheMarkets extends Component {
  componentWillMount () {
    this.props.setMarketsLoading(true)
    this.props.getMarketsData({ sort: 'asc' }).then(payload => {
      this.props.setMarketsLoading(false)
      this.props.setMarketsError({ value: false, message: '' })
    }).catch(error => {
      console.error(error)
      this.props.setMarketsLoading(false)
      this.props.setMarketsError({ value: true, message: error.message })
    })
  }

  render () {
    const { marketsSidebar, className, toggleMarketsAction, markets, loading, error } = this.props
    const splittedMarkets = markets.reduce((reducer, { book, data }) => {
      const buyMarket = data.filter(trade => trade.makerSide === 'buy')
      const sellMarket = data.filter(trade => trade.makerSide === 'sell')
      return [ ...reducer, { book, data: sellMarket }, { book, data: buyMarket } ]
    }, [])

    return (
      <div className={classnames('markets', className, { active: marketsSidebar })}>
        <div className='toggle-martkets is-hidden-mobile' onClick={toggleMarkets.bind(null, toggleMarketsAction)}>
          <i className='material-icons'>
            { marketsSidebar ? 'keyboard_arrow_right' : 'keyboard_arrow_left' }
          </i>
          <div>mercados</div>
        </div>
        <div className='content'>
          <div className='header'>mercados 24hrs</div>
          <div className={classnames('markets-container', { loading: loading && marketsSidebar })}>
            { (!loading && !error) ? splittedMarkets.map((market, index) => (
              <MarketChart key={market.book.book + index} {...market} />)
            ) : (
              <h3 className='error'>Ocurrio un error al tratar de obtener los datos del servidor, intentalo nuevamente</h3>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ui, markets }) => ({
  marketsSidebar: ui.marketsSidebar,
  markets: markets.list,
  loading: markets.loading,
  error: markets.error,
  errorMessage: markets.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  toggleMarketsAction: bindActionCreators(toggleMarketsAction, dispatch),
  getMarketsData: bindActionCreators(getMarketsDataAction, dispatch),
  setMarketsLoading: bindActionCreators(setMarketsLoadingAction, dispatch),
  setMarketsError: bindActionCreators(setMarketsErrorAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheMarkets)
