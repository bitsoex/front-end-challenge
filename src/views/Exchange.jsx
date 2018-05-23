import React, { Component } from 'react'
import TheHeader from '../components/TheHeader'

export default class Home extends Component {
  render () {
    return (
      <div className='page'>
        <TheHeader page={this.props.page} exchange={100000.12} />
        <main>
          hello world
        </main>
      </div>
    )
  }
}
