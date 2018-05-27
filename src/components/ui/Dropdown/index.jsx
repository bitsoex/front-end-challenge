import React from 'react'
import classnames from 'classnames'

import './index.css'

const onChangeOption = (callback, option) => {
  if (!callback) return ''
  callback(option)
}

const Dropdown = ({ options = [], text = '', className, onChange, ...props }) => (
  <div className={classnames('dropdown', className)}>
    <div className='text'>
      { text }
      <i className='material-icons expand'>keyboard_arrow_down</i>
      <i className='material-icons short'>keyboard_arrow_up</i>
    </div>
    <ul>
      {
        options.map((option, index) => (
          <li onClick={onChangeOption.bind(null, onChange, option)} key={option.id || index}>
            { option.icon }
            { option.label }
          </li>
        ))
      }
    </ul>
  </div>
)

export default Dropdown
