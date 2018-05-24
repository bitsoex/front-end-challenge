import React, { Component } from 'react'
import TheHeader from '../../components/TheHeader'
import Table from '../../components/ui/Table'

import './index.css'

const columns = [
  {
    header: 'hora',
    accessor: 'time',
    className: 'time'
  },
  {
    header: <div className='last-trades-header'><span>mxn</span>precio</div>,
    className: 'price',
    accessor: (row) => (
      <span className={row.price > 0 ? 'revenue' : 'loss'}>
        {row.price.toLocaleString({ style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })}
      </span>
    )
  },
  {
    header: <div className='last-trades-header'><span>btc</span>monto</div>,
    className: 'amount',
    accessor: 'amount'
  }
]

const data = [
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: -390192, amount: 1.9098 },
  { time: '16:10:25', price: -390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: -390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 },
  { time: '16:10:25', price: 390192, amount: 1.9098 }
]

export default class Home extends Component {
  render () {
    return (
      <div className='page'>
        <TheHeader page={this.props.page} exchange={100000.12} />
        <main>
          <Table
            className='last-trades'
            header='últimos trades'
            columns={columns}
            data={data}
          />
        </main>
      </div>
    )
  }
}
