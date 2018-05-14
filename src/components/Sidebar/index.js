import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'

class SideBar extends Component {
  state = {
    hiddenBar: true
  }

  render() {
    const {
      state: { hiddenBar }
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
            <div className="header">
              <p>Mercados 24 hrs</p>
            </div>
            <div>
              <p>Mercados 24 hrs</p>
              <div className="graph" />
            </div>
            <div>
              <p>Mercados 24 hrs</p>
              <div className="graph" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar
