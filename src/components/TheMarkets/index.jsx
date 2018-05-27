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
    this.props.getMarketsData().then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false })
    })
  }

  render () {
    const { marketsSidebar, className, toggleMarketsAction, markets } = this.props
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
            { !this.state.loading && markets.map(market => <MarketChart key={market.book.book} {...market} />) }
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
