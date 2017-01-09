import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import classes from './HomeView.scss'

import LoggedOutHome from 'components/LoggedOutHome'

import { setAuthToken, loadSession, clearSession } from 'utils/auth'

import { setUser } from 'redux/actions/user'

class HomeView extends React.Component {
  static propTypes = {
    setUser: PropTypes.func,
    currentUser: ImmutablePropTypes.record,
    history: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.loggedInRedirectToDigests(this.props)
  }

  componentWillUpdate(nextProps, nextState) {
    this.loggedInRedirectToDigests(nextProps)
  }

  onLogout = () => {
    const { setUser } = this.props
    clearSession(setUser)
  }

  setUserSession = (token) => {
    const { setUser } = this.props
    setAuthToken(token)
    loadSession(setUser)
  }

  loggedInRedirectToDigests = (props) => {
    const { currentUser, history } = props
    // auto redirect '/digests' path if logged in
    // kind of annoying in that you can't go back
    if (currentUser) {
      history.push('/digests')
    }
  }

  render = () => {
    const { currentUser } = this.props
    return (
      <div>
        {
          currentUser
          ?
            <div className="container">
              `logged in user with id: ${currentUser.get('id')}`
              <button onClick={this.onLogout}>logout</button>
            </div>
          :
            <LoggedOutHome />
        }
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

export default connect(mapStateToProps, { setUser })(HomeView)
