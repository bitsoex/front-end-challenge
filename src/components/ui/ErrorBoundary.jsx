import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    console.error(error, info)
  }

  render () {
    if (this.state.hasError) {
      return <h4>El elemento no se puede renderizar con los datos dados</h4>
    }
    return this.props.children
  }
}

export default ErrorBoundary
