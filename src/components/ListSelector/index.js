import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'

class ListSelector extends Component {
  static propTypes = {
    onItemClick: PropTypes.func,
    items: PropTypes.array,
    type: PropTypes.string,
    value: PropTypes.string
  }

  state = {
    isHidden: true
  }

  toggleHidden: Function = () => {
    this.setState(prev => ({
      isHidden: !prev.isHidden
    }))
  }

  onItemClick = item => {
    this.toggleHidden()
    this.props.onItemClick(item)
  }

  render() {
    const {
      state: { isHidden },
      props: { items, type, value }
    } = this
    return (
      <div className={`selector ${type}${isHidden ? ' --hidden' : ''}`}>
        <span onClick={this.toggleHidden}>{value}</span>
        <ul>
          {items.map(item => (
            <li onClick={() => this.onItemClick(item)} key={item[type]}>
              {item[type].replace('_', '/')}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListSelector
