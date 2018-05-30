import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const PositionHeader = ({ type, number, currency, className, title }) => (
  <div className={classnames('header', className)}>
    <div className='title'>{ title }</div>
    <div className='average'>
      <span>{currency}</span>
      <div className='type'><span>{type}</span> <span>{number}</span></div>
    </div>
  </div>
)

PositionHeader.propTypes = {
  type: PropTypes.oneOf(['bid', 'ask']).isRequired,
  currency: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

PositionHeader.defaultProps = {
  type: 'bid',
  number: 0,
  currency: 'mxn',
  title: 'posturas de compra'
}

export default PositionHeader
