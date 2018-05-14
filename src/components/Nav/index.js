import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ListSelector from 'components/ListSelector'

import bitsoLogo from 'assets/icons/bitso.svg'
import './style.less'

function Nav({ books, onBookSelect, selectedBook }) {
  const from = selectedBook.book.split('_')[0].toUpperCase()
  const to = selectedBook.book.split('_')[1].toUpperCase()

  const VALUES = [
    {
      title: 'Volumen 24 hrs.',
      value: `${0} ${from}`
    },
    {
      title: 'Max.',
      value: `${0} ${from}`
    },
    {
      title: 'Min.',
      value: `${0} ${from}`
    },
    {
      title: 'Variación',
      value: `+4,061.68 ${to} (1.4%)`
    }
  ]

  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__title">
          <img src={bitsoLogo} alt="Bitso" className="logo" />
          <div className="vr" />
          <p>Exchange</p>
        </div>
        <ul className="nav__actions">
          <li>
            1 {from} = 000,000.00{to}
          </li>
          <div className="vr" />
          <li>Wallet</li>
          <li>Echange</li>
          <li>Ayuda</li>
          <li className="user-image">
            <img src="" alt="" />
          </li>
          <li>Usuario</li>
          <input type="checkbox" />
        </ul>
      </nav>
      <ul className="trade-overview">
        <ListSelector
          value={selectedBook.book.replace('_', '/')}
          items={books}
          onItemClick={onBookSelect}
          type="book"
        />
        {VALUES.map(({ title, value }) => (
          <li key={title}>
            <span>{title}</span>
            <p>{value}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

Nav.propTypes = {
  books: PropTypes.array,
  onBookSelect: PropTypes.func,
  selectedBook: PropTypes.object
}

Nav.defaultProps = {
  selectedBook: {
    book: ''
  }
}

export default Nav
