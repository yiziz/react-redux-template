import React from 'react'
import classNames from 'classnames'

import classes from './LoggedOutHome.scss'

import Footer from 'components/Footer'

class LoggedOutHome extends React.Component {
  render() {
    return (
      <div className={classes.loggedOutHome}>
        <div className={classes.background}>
          <div className={classes.banner} />
        </div>
        <div className={classNames("container", classes.foreground)}>
          <div className={classes.content}>
            <div className={classes.digest}>
              <div className={classes.digestBanner}>
                <div className={classes.title}>React Redux Template</div>
                <div className={classes.actions}>
                  <button>Get Started</button>
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.title}></div>
                <div className={classes.text}>
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.title}></div>
                <div className={classes.text}>
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.title}></div>
                <div className={classes.image}>
                </div>
                <div className={classes.text}>
                </div>
              </div>
              <div className={classNames(classes.actions, classes.section)}>
                <button>Get Started</button>
              </div>
            </div>
            <div className={classes.footer}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoggedOutHome
