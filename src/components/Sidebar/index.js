import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Book from 'components/Book'

import './style.less'

class SideBar extends Component {
  static propTypes = {
    books: PropTypes.array
  }

  state = {
    hiddenBar: true
  }

  render() {
    const {
      state: { hiddenBar },
      props: { books }
    } = this

    return (
      <div className="dashboard__sidebar-container">
        <div className={`content-container${hiddenBar ? ' --hidden' : ''}`}>
          <div
            className={`bar `}
            onClick={() =>
              this.setState(prev => ({ hiddenBar: !prev.hiddenBar }))
            }>
            <p>Mercados</p>
          </div>
          <div className="content">
            <div className="book-item --header">
              <p>Mercados 24 hrs</p>
            </div>
            {books.map(item => {
              return <Book key={item.book} {...item} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ books }) {
  return {
    books
  }
}

export default connect(mapStateToProps)(SideBar)
