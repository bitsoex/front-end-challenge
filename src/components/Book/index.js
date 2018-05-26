import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import './style.less'

class Book extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
    high: PropTypes.string
  }

  options = {
    title: { text: null },
    credits: false,
    navigator: false,
    legend: false,
    chart: {
      backgroundColor: '#161a1e',
      height: 90
    },
    tooltip: false,
    xAxis: {
      gridLineWidth: 0,
      visible: false
    },
    yAxis: {
      gridLineWidth: 0,
      visible: false
    },
    series: [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }
    ]
  }

  state = {
    hidden: true
  }

  onToggleHidden = () => {
    this.setState(prev => ({
      hidden: !prev.hidden
    }))
  }

  render() {
    const {
      props: { book, high },
      state: { hidden },
      options
    } = this
    const bookName = book.replace('_', '/')
    const [, to] = bookName.split('/')

    return (
      <div className={`book-item ${hidden ? '' : '--expanded'}`}>
        <div className="book-item__title" onClick={this.onToggleHidden}>
          <p>{bookName}</p>
          <p className="value">
            {to === 'MXN' && '$'}
            {high} {to}
          </p>
        </div>
        <div className="book-item__body">
          <span className="time">10:23 AM</span>
          <div className="chart">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    )
  }
}

export default Book
