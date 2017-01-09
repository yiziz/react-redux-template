import React from 'react'
import { IndexLink, Link } from 'react-router'

import classes from './Footer.scss'

const Footer = () => {
  return (
    <div className={classes.footer}>
      <IndexLink to='/'>Home</IndexLink>
      <Link to='/about'>About</Link>
    </div>
  )
}

export default Footer
