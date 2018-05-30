import React from 'react'

import candlestickIcon from '../../Assets/Images/1x/icon_candles.png'
import deepIcon from '../../Assets/Images/1x/icon_deep.png'

const DEFAULT_PERIOD = '1year'

export default Object.freeze({
  chartOptions: [
    {
      value: 'candlestick',
      label: <img src={candlestickIcon} alt='candlestick-chart' />
    },
    {
      value: 'deep',
      label: <img src={deepIcon} alt='deep-chart' />
    }
  ],

  periodOptions: [
    {
      value: '1month',
      label: '1m'
    },
    {
      value: '3months',
      label: '3m'
    },
    {
      value: DEFAULT_PERIOD,
      label: '1y'
    }
  ],

  intervalOptions: [
    {
      value: '1hour',
      label: '1h'
    },
    {
      value: '5hours',
      label: '5h'
    },
    {
      value: '1minute',
      label: '1m'
    }
  ],

  defaultPeriod: DEFAULT_PERIOD
})
