import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'

class MiniListSelector extends Component {
  static propTypes = {
    onItemSelect: PropTypes.func,
    items: PropTypes.array,
    value: PropTypes.object
  }

  state = {
    isHidden: true
  }

  onToggleHidden = () => {
    this.setState(prev => ({
      isHidden: !prev.isHidden
    }))
  }

  onItemSelect = item => {
    this.setState({ isHidden: true })
    this.props.onItemSelect(item)
  }

  render() {
    const {
      state: { isHidden },
      props: { items, value }
    } = this
    return (
      <div className="mini-list-selector">
        <span onClick={this.onToggleHidden}>{value.title}</span>
        {!isHidden && (
          <ul>
            {items.map(item => (
              <li onClick={() => this.onItemSelect(item)} key={item.title}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default MiniListSelector
