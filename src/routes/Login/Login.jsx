import React from 'react'
import { connect } from 'react-redux'

class Login extends React.Component {
  render() {
    return (
      <div>login</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(Login)
