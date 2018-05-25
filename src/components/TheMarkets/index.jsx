import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleMarkets as toggleMarketsAction } from '../../store/actions/ui'

import './index.css'
import './animations.css'

const toggleMarkets = (action) => action()

const TheMarkets = ({ marketsSidebar, className, ...props }) => (
  <div className={classnames('markets', className, { active: marketsSidebar })}>
    <div className='toggle-martkets is-hidden-mobile' onClick={toggleMarkets.bind(null, props.toggleMarketsAction)}>
      <i className='material-icons'>
        { marketsSidebar ? 'keyboard_arrow_left' : 'keyboard_arrow_right' }
      </i>
      <div>mercados</div>
    </div>
    <div className='content'>
      <div className='header'>mercados 24hrs</div>
    </div>
  </div>
)

const mapStateToProps = ({ ui }) => ({ marketsSidebar: ui.marketsSidebar })

const mapDispatchToProps = (dispatch) => ({
  toggleMarketsAction: bindActionCreators(toggleMarketsAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheMarkets)
