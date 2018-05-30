import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import kebabCase from 'lodash/kebabCase'

import Link from '../ui/Link'
import Dropdown from '../ui/Dropdown'

import { floatStringToLocaleString } from '../../lib/utils'

import { toggleSidebar as toggleSidebarAction } from '../../store/actions/ui'
import {
  getTickerData as getTickerDataAction,
  setTickerLoading as setTickerLoadingAction,
  setTickerError as setTickerErrorAction
} from '../../store/actions/exchange'

import logo from '../../../Assets/Images/2x/bitso_logo@2x.png'
import mobileLog from '../../../Assets/Images/1x/bitso.png'

import './index.css'
import './animations.css'

const toggleSidebar = (action) => action()

const TheHeader = (props) => {
  const {
    page,
    toggleSidebarAction,
    headerSidebar,
    books,
    selectedBook,
    book,
    loading,
    to
  } = props

  let [ type, currency ] = book.split('_')

  const exchangeOptions = books
    .filter(currentBook => currentBook.value !== book)
    .map(currentBook => (
      <Link
        label={currentBook.label}
        to={{ ...to, params: { book: kebabCase(currentBook.value) } }}
      />
    ))

  return (
    <div className='header-container'>
      <header>
        <div className='logo'>
          <img src={logo} alt='bitso-logo' className='logo is-hidden-mobile' />
          <img src={mobileLog} alt='bitso-logo' className='logo is-hidden-desktop' />
        </div>
        <div className='title-page money-exchange'>
          <div>{ page }</div>
          <div className='upper-text'>
            1 {type} = { currency === 'mxn' ? floatStringToLocaleString(selectedBook.last, { minimumFractionDigits: 2 }) : selectedBook.last } {currency}
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
      <div className={classnames('stats', { loading })}>
        <Dropdown
          className='exchange-type'
          options={exchangeOptions}
          text={book.replace('_', '/').toUpperCase()}
        />
        <div className='list'>
          <div className='stat'>
            <span className='label'>Volumen 24hrs</span>
            <span className='value upper-text'>{selectedBook.volume} {type}</span>
          </div>
          <div className='stat'>
            <span className='label'>Max</span>
            <span className='value upper-text'>
              {
                currency === 'mxn'
                  ? floatStringToLocaleString(selectedBook.high, { minimumFractionDigits: 2 })
                  : selectedBook.high
              }
              {currency}
            </span>
          </div>
          <div className='stat'>
            <span className='label'>Min</span>
            <span className='value upper-text'>
              {
                currency === 'mxn'
                  ? floatStringToLocaleString(selectedBook.low, { minimumFractionDigits: 2 })
                  : selectedBook.low
              }
              {currency}
            </span>
          </div>
          <div className='stat'>
            <span className='label'>Valoración</span>
            <span className='value upper-text'>
              +
              {
                currency === 'mxn'
                  ? floatStringToLocaleString(selectedBook.vwap, { minimumFractionDigits: 2 })
                  : selectedBook.vwap
              }
              {currency} (1.4%) {/* hardcoded because i don't understand how to calculate it */}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ui, ticker, books }) => ({
  headerSidebar: ui.headerSidebar,
  books: books.list.map(availableBook => ({
    value: availableBook.book,
    label: availableBook.book.replace('_', '/').toUpperCase()
  })),
  selectedBook: ticker.current,
  loading: ticker.loading,
  error: ticker.error,
  errorMessage: ticker.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  toggleSidebarAction: bindActionCreators(toggleSidebarAction, dispatch),
  getTickerData: bindActionCreators(getTickerDataAction, dispatch),
  setTickerLoading: bindActionCreators(setTickerLoadingAction, dispatch),
  setTickerError: bindActionCreators(setTickerErrorAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader)
