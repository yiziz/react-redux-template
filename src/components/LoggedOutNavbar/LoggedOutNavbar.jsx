import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import classes from './LoggedOutNavbar.scss'

import Login from 'components/Login'

class LoggedOutNavbar extends React.Component {
  static propTypes = {
    setUserSession: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <div className={classes.pullLeft}>
          <div className={classes.brand}>
            <IndexLink to='/'>Home</IndexLink>
          </div>
        </div>
        <div className={classes.pullRight}>
          <Login setUserSession={this.props.setUserSession} />
        </div>
      </div>
    )
  }
}

export default LoggedOutNavbar
