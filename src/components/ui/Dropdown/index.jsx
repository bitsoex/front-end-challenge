import React from 'react'

import './index.css'

const Dropdown = ({ options = [], text = '', ...props }) => (
  <div className='dropdown'>
    { text }
    <i className='material-icons'>arrow_drop_down</i>
    <i className='material-icons'>arrow_drop_up</i>
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
