import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { setAccount } from 'redux/actions/account'

class Account extends React.Component {
  static propTypes = {
    setAccount: PropTypes.func.isRequired,
    account: ImmutablePropTypes.record,
  }

  componentWillMount() {
    this.props.setAccount()
  }

  render() {
    const { account } = this.props
    return (
      <div>account of user id: {account && account.get('id')}</div>
    )
  }
}

const mapStateToProps = (state) => {
  const { account } = state
  const accountList = account.get('data')
  return {
    account: accountList.first()
  }
}

export default connect(mapStateToProps, { setAccount })(Account)
