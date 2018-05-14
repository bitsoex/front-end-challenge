import React, { Component } from 'react'
import TheHeader from '../components/ui/TheHeader'

export default class Home extends Component {
  render () {
    return (
      <div className='page'>
        <TheHeader page={this.props.page} exchange={100000.12} />
        hello world
      </div>
    )
  }
}
