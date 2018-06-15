import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import { toggleTheme as toggleThemeAction } from '../../../store/actions/ui'

import './index.css'

const ThemeToggle = ({ theme, toggleTheme }) => (
  <div className={classnames('theme-toggle', theme)} onClick={toggleTheme.bind(null)}>
    <i className='material-icons dark'>brightness_3</i>
    <i className='material-icons light'>wb_sunny</i>
    <i className='material-icons hide'>brightness_1</i>
  </div>
)

const mapStateToProps = ({ ui }) => ({
  theme: ui.theme
})

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: bindActionCreators(toggleThemeAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle)
