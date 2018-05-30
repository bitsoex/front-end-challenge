import React, { Component } from 'react'
import classnames from 'classnames'

import './index.css'

class ThemeToggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'dark'
    }
  }

  toggleTheme () {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({ theme })
  }

  render () {
    return (
      <div className={classnames('theme-toggle', this.state.theme)} onClick={this.toggleTheme.bind(this)}>
        <i className='material-icons dark'>brightness_3</i>
        <i className='material-icons light'>wb_sunny</i>
        <i className='material-icons hide'>brightness_1</i>
      </div>
    )
  }
}

export default ThemeToggle
