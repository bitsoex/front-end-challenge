import React, { Component } from 'react'
import TheHeader from '../components/TheHeader'
import Table from '../components/ui/Table'

const columns = [
  { header: 'hora', accessor: 'time' },
  { header: 'mxn precio', accessor: 'price' },
  { header: 'btc monto', accessor: 'amount' }
]

const data = [
  { time: '123', price: '0', amount: '123123' },
  { time: '123', price: '0', amount: '123123' },
  { time: '123', price: '0', amount: '123123' }
]

export default class Home extends Component {
  render () {
    return (
      <div className='page'>
        <TheHeader page={this.props.page} exchange={100000.12} />
        <Table
          header='últimos trades'
          columns={columns}
          data={data}
        />
        <main>
          hello world
        </main>
      </div>
    )
  }
}
