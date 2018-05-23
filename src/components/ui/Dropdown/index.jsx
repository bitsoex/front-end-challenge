import React from 'react'
import classnames from 'classnames'

import './index.css'

const Dropdown = ({ options = [], text = '', className, ...props }) => (
  <div className={classnames('dropdown', className)}>
    <div className='text'>
      { text }
      <i className='material-icons expand'>arrow_drop_down</i>
      <i className='material-icons short'>arrow_drop_up</i>
    </div>
    <ul>
      {
        options.map((option, index) => (
          <li key={option.id || index}>
            { option.icon }
            { option.label }
          </li>
        ))
      }
    </ul>
  </div>
)

export default Dropdown
