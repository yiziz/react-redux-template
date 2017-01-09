import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import classNames from 'classnames'

import classes from './Navbar.scss'

import { setUser } from 'redux/actions/user'
import { setAuthToken, loadSession, clearSession } from 'utils/auth'

import LoggedOutNavbar from 'components/LoggedOutNavbar'

class Navbar extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    currentUser: ImmutablePropTypes.record,
  }

  setUserSession = (token) => {
    const { setUser } = this.props
    setAuthToken(token)
    loadSession(setUser)
  }

  render() {
    const { currentUser, location } = this.props
    const isHome = location.pathname === '/'
    const onLandingPage = !currentUser && isHome
    return (
      <div className={classNames(classes.navbar, { [classes.landing]: onLandingPage })}>
        <div className={classNames("container", classes.navbarContent)}>
          { currentUser ?
            <div>
              <div className={classes.brand}>
                <IndexLink to='/'>Home</IndexLink>
              </div>
              <div className={classes.menu}>
                <Link to='/digests'>Your Digests</Link>
                <Link to='/subscriptions'>Your Subscriptions</Link>
                <Link to='/logout'>Logout</Link>
              </div>
            </div>
            :
            <LoggedOutNavbar setUserSession={this.setUserSession} />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  const userList = user.get('data')
  const currentUser = userList.first()
  return {
    currentUser,
  }
}

export default connect(mapStateToProps, { setUser })(Navbar)
