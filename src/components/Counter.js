import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({value, onClickI, onClickD}) => (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onClickI}>
          +
        </button>
        {' '}
        <button onClick={onClickD}>
          -
        </button>
        {' '}
      </p>
    )

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onClickI: PropTypes.func.isRequired,
  onClickD: PropTypes.func.isRequired
}

export default Counter