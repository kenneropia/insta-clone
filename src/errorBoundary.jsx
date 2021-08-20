import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <h1 className="text-red-primary text-lg">Something went wrong.</h1>
        ) : null}
        {this.props.children}
      </div>
    )
  }
}

export default ErrorBoundary
