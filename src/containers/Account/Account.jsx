import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import { setAccount } from 'redux/actions/account'

import classes from './Account.scss'

class Account extends React.Component {
  static propTypes = {
    setAccount: PropTypes.func.isRequired,
    account: ImmutablePropTypes.record,
    params: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.setAccount()
  }

  render() {
    const { account } = this.props
    const tokens = (account && account.get('tokens')) || []
    return (
      <div className={classes.account}>
        {
          tokens.map((t) => {
            const { email } = t
            return (
              <div key={email}>
                {email}
              </div>
            )
          })
        }
        <button>Disconnect Account</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { account } = state
  return {
    account: account.get('data').first()
  }
}

export default connect(mapStateToProps, { setAccount })(Account)
