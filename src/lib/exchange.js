import React from 'react'
import moment from 'moment-timezone'
import range from 'lodash/range'

import { floatStringToLocaleString } from './utils'

const INITIAL_RANGE = 0
const NORMALIZE_INDEX = 1

export const createLastTradesColumns = (type, currency) => [
  {
    header: 'hora',
    className: 'time',
    accessor: (row) => moment(row.createdAt).tz('America/Mexico_City').format('hh:mm:ss')
  },
  {
    header: <div className='last-trades-header'><span>{currency}</span>precio</div>,
    className: 'price',
    accessor: (row) => (
      <span className={row.makerSide}>
        {floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })}
      </span>
    )
  },
  {
    header: <div className='last-trades-header'><span>{type}</span>monto</div>,
    className: 'amount',
    accessor: 'amount'
  }
]

export const createBidsColumns = (type, currency, bidsSum) => [
  {
    header: '',
    className: 'percent is-hidden-mobile',
    accessor: (row) => <div className='percent' style={{ width: `${(row.amount * 100) / bidsSum}%` }} />
  },
  {
    header: 'sum',
    className: 'is-hidden-mobile',
    accessor: (row, index, rows) => {
      const items = range(INITIAL_RANGE, index + NORMALIZE_INDEX)
      const sum = items.reduce((reducer, item) => parseFloat(rows[item].amount) + reducer, 0)
      return floatStringToLocaleString(sum, { minimumFractionDigits: 5 })
    }
  },
  {
    header: <div className='btc-amount'><span>{type}</span>monto</div>,
    className: 'amount',
    accessor: (row) => floatStringToLocaleString(row.amount, { minimumFractionDigits: 5 })
  },
  {
    header: <div className='mxn-value'><span>{currency}</span>valor</div>,
    className: 'mxn-value',
    accessor: (row) => floatStringToLocaleString(row.amount * row.price)
  },
  {
    header: <div className='mxn-price'><span>{currency}</span>precio</div>,
    className: 'mxn-price',
    accessor: (row) => floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })
  }
]

export const createAsksColumns = (type, currency, asksSum) => [
  {
    header: <div className='mxn-price'><span>{currency}</span>precio</div>,
    className: 'mxn-price',
    accessor: (row) => floatStringToLocaleString(row.price, { minimumFractionDigits: 2 })
  },
  {
    header: <div className='mxn-value'><span>{currency}</span>valor</div>,
    className: 'mxn-value',
    accessor: (row) => floatStringToLocaleString(row.amount * row.price)
  },
  {
    header: <div className='btc-amount'><span>{type}</span>monto</div>,
    className: 'amount',
    accessor: (row) => floatStringToLocaleString(row.amount, { minimumFractionDigits: 5 })
  },
  {
    header: 'sum',
    className: 'is-hidden-mobile',
    accessor: (row, index, rows) => {
      const items = range(INITIAL_RANGE, index + NORMALIZE_INDEX)
      const sum = items.reduce((reducer, item) => parseFloat(rows[item].amount) + reducer, 0)
      return floatStringToLocaleString(sum, { minimumFractionDigits: 5 })
    }
  },
  {
    header: '',
    className: 'percent is-hidden-mobile',
    accessor: (row) => (
      <div className='percent' style={{ width: `${(row.amount * 100) / asksSum}%` }} />
    )
  }
]
