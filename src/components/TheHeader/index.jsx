import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { floatStringToLocaleString } from '../../lib/utils'

import { toggleSidebar as toggleSidebarAction } from '../../store/actions/ui'
import { getTickerData as getTickerDataAction } from '../../store/actions/exchange'

import Dropdown from '../ui/Dropdown'

import logo from '../../../Assets/Images/2x/bitso_logo@2x.png'
import mobileLog from '../../../Assets/Images/1x/bitso.png'

import './index.css'
import './animations.css'

const toggleSidebar = (action) => action()

class TheHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: false
    }
  }

  componentWillMount () {
    this.setState({ loading: true })
    this.props.getTickerData().then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false })
    })
  }

  selectBook (option) {
    this.setState({ loading: true })
    this.props.getTickerData(option.value).then(payload => {
      this.setState({ loading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ loading: false })
    })
  }

  render () {
    const {
      page,
      toggleSidebarAction,
      headerSidebar,
      books,
      selectedBook
    } = this.props

    let [ type, currency ] = selectedBook.book.split('_')

    if (type) type = type.toUpperCase()
    if (currency) currency = currency.toUpperCase()

    return (
      <div className='header-container'>
        <header>
          <div className='logo'>
            <img src={logo} alt='bitso-logo' className='logo is-hidden-mobile' />
            <img src={mobileLog} alt='bitso-logo' className='logo is-hidden-desktop' />
          </div>
          <div className='title-page money-exchange'>
            <div>{ page }</div>
            <div>
              1 {type} = { currency === 'MXN' ? floatStringToLocaleString(selectedBook.last, { minimumFractionDigits: 2 }) : selectedBook.last } {currency}
            </div>
          </div>
          <nav>
            <i
              className='material-icons is-hidden-tablet'
              onClick={toggleSidebar.bind(null, toggleSidebarAction)}
            >
              menu
            </i>
            <ul className={classnames('menu', { show: headerSidebar, hidden: !headerSidebar })}>
              <li><Dropdown options={[{ label: 'First Wallet Page' }]} text='Wallet' /></li>
              <li><Dropdown options={[{ label: 'Second Exchange Page' }]} text='Exchange' /></li>
              <li><Dropdown options={[{ label: 'Help Page' }]} text='Ayuda' /></li>
              <li className='user'>
                <div className='avatar'>
                  <img />
                </div>
                <Dropdown options={[{ label: 'Settings' }]} text='Usuario' />
              </li>
            </ul>
          </nav>
        </header>
        <div className={classnames('stats', { loading: this.state.loading })}>
          <Dropdown
            className='exchange-type'
            options={books.filter(book => book.value !== selectedBook.book)}
            onChange={this.selectBook.bind(this)}
            text={selectedBook.book.replace('_', '/').toUpperCase()}
          />
          <div className='list'>
            <div className='stat'>
              <span className='label'>Volumen 24hrs</span>
              <span className='value'>{selectedBook.volume} {type}</span>
            </div>
            <div className='stat'>
              <span className='label'>Max</span>
              <span className='value'>{currency === 'MXN' ? floatStringToLocaleString(selectedBook.high, { minimumFractionDigits: 2 }) : selectedBook.high } {currency}</span>
            </div>
            <div className='stat'>
              <span className='label'>Min</span>
              <span className='value'>{currency === 'MXN' ? floatStringToLocaleString(selectedBook.low, { minimumFractionDigits: 2 }) : selectedBook.low } {currency}</span>
            </div>
            <div className='stat'>
              <span className='label'>Valoración</span>
              <span className='value'>
                + {currency === 'MXN' ? floatStringToLocaleString(selectedBook.vwap, { minimumFractionDigits: 2 }) : selectedBook.vwap } {currency} (1.4%) {/* hardcoded because i don't understand how to calculate it */}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ui, ticker }) => ({
  headerSidebar: ui.headerSidebar,
  books: ticker.data.map(tick => ({ value: tick.book, label: tick.book.replace('_', '/').toUpperCase() })),
  selectedBook: ticker.current
})

const mapDispatchToProps = (dispatch) => ({
  toggleSidebarAction: bindActionCreators(toggleSidebarAction, dispatch),
  getTickerData: bindActionCreators(getTickerDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader)
