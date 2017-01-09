import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import classNames from 'classnames'

import classes from './Logout.scss'

import { clearSession } from 'utils/auth'

import { setUser } from 'redux/actions/user'

class Logout extends React.Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    currentUser: ImmutablePropTypes.record,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    clearSession(this.props.setUser)
  }

  componentWillUpdate(nextProps, nextState) {
    this.loggedInRedirectToDigests(nextProps)
  }

  loggedInRedirectToDigests = (props) => {
    const { currentUser, history } = props
    // auto redirect '/digests' path if logged in
    // kind of annoying in that you can't go back
    if (currentUser) {
      history.push('/digests')
    }
  }

  render() {
    return (
      <div className={classNames("container", classes.logout)}>
        logout
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  const userList = user.get('data')
  const currentUser = userList.first()
  return {
    currentUser
  }
}

export default connect(mapStateToProps, { setUser })(Logout)
