import React, { Component } from 'react'

import TheHeader from '../../components/TheHeader'
import TheMarkets from '../../components/TheMarkets'
import Table from '../../components/ui/Table'

import { lastTradesData, purchasePositionData } from '../../../.hardcode'

import './index.css'

export default class Home extends Component {
  lastTradesColumns = [
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

  positionsColumns = [
    {
      header: '',
      className: 'percent',
      accessor: (row) => (
        <div className='percent' style={{ width: `${row.percent * 100}%` }} />
      )
    },
    {
      header: 'sum',
      accessor: 'sum'
    },
    {
      header: <div className='btc-amount'><span>btc</span>monto</div>,
      className: 'amount',
      accessor: 'btcAmount'
    },
    {
      header: <div className='mxn-value'><span>mxn</span>valor</div>,
      className: 'mxn-value',
      accessor: (row) => row.mxnValue.toLocaleString({ style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
    },
    {
      header: <div className='mxn-price'><span>mxn</span>precio</div>,
      className: 'mxn-price',
      accessor: (row) => row.mxnPrice.toLocaleString({ style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
    }
  ]

  purchasePositionColumns = this.positionsColumns
  sellPositionColumns = this.positionsColumns.map(value => value).reverse()

  purshasePositionHeader = (
    <div className='purchase-position-header'>
      <div className='title'>posturas de compra</div>
      <div className='average'>
        <span>mxn</span>
        bid 319,140.00
      </div>
    </div>
  )

  sellPositionHeader = (
    <div className='sell-position-header'>
      <div className='average'>
        bid 319,140.00
        <span>mxn</span>
      </div>
      <div className='title'>posturas de venta</div>
    </div>
  )

  render () {
    return (
      <div className='page'>
        <TheHeader page={this.props.page} />
        <main className='exchange'>
          <Table
            className='last-trades'
            header='últimos trades'
            columns={this.lastTradesColumns}
            data={lastTradesData}
          />
          <div className='positions'>
            <Table
              className='purchase-position'
              header={this.purshasePositionHeader}
              columns={this.purchasePositionColumns}
              data={purchasePositionData}
            />
            <Table
              className='sell-position'
              header={this.sellPositionHeader}
              columns={this.sellPositionColumns}
              data={purchasePositionData}
            />
          </div>
          <TheMarkets />
        </main>
      </div>
    )
  }
}
