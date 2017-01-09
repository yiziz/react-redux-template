import React, { PropTypes } from 'react'
import Modal from 'boron/FadeModal'
import classNames from 'classnames'

import classes from './Login.scss'

class Login extends React.Component {
  static propTypes = {
    setUserSession: PropTypes.func.isRequired,
  }

  onGetStartedClick = () => {
    this.getStartedModal && this.getStartedModal.show()
  }

  setGetStartedModal = (c) => {
    this.getStartedModal = c
  }

  render() {
    return (
      <div>
        <a>Login</a>
        <button
          className={classNames("clear-btn", classes.getStartedButton)}
          onClick={this.onGetStartedClick}
        >Get Started</button>
        <Modal className={classNames("modal", classes.getStartedModal)} ref={this.setGetStartedModal}>
          foobar
        </Modal>
      </div>
    )
  }
}

Login.propTypes = {
}

export default Login
