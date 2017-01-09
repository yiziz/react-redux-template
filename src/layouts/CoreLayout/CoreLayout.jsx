import React from 'react'
import classNames from 'classnames'

import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => {
  const { children, location } = props
  return (
    <div>
      <Header location={location} />
      <div>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object.isRequired,
}

export default CoreLayout
