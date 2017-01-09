import React, { PropTypes } from 'react'
import classes from './Header.scss'

import Navbar from 'containers/Navbar'

export const Header = ({ location }) => {
  return (
    <div className={classes.header}>
      <Navbar location={location} />
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
