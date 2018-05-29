import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleMarkets as toggleMarketsAction } from '../../store/actions/ui'
import { getMarketsData as getMarketsDataAction } from '../../store/actions/exchange'

import MarketChart from '../MarketChart'

import './index.css'
import './animations.css'

const toggleMarkets = (action) => action()

class TheMarkets extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: false
    }
  }

  componentWillMount () {
    this.setState({ loading: true })
    this.props.getMarketsData({ sort: 'asc' }).then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false, error: true })
    })
  }

  render () {
    const { marketsSidebar, className, toggleMarketsAction, markets } = this.props
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
          <div className={classnames('markets-container', { loading: this.state.loading && marketsSidebar })}>
            { (!this.state.loading && !this.state.error) ? splittedMarkets.map((market, index) => (
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
  markets: markets.list
})

const mapDispatchToProps = (dispatch) => ({
  toggleMarketsAction: bindActionCreators(toggleMarketsAction, dispatch),
  getMarketsData: bindActionCreators(getMarketsDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheMarkets)
