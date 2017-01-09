import React, { PropTypes } from 'react'

import Loading from 'components/Loading'

class SubmitButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 1,
  }

  constructor() {
    super()
    this.state = {
      submitStatus: 'default',
    }
  }

  onClick = () => {
    const { action } = this.props
    const submitAction = action()
    submitAction.setStateStatus('submitStatus', this)
  }

  render() {
    const { children, size, ...rest } = this.props
    const { submitStatus } = this.state
    return (
      <button onClick={this.onClick} {...rest}>
        <Loading loading={submitStatus !== 'success' && submitStatus !== 'default'} size={size}>{children}</Loading>
      </button>
    )
  }
}


export default SubmitButton
