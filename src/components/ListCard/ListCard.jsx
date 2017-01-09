import React, { PropTypes } from 'react'
import classNames from 'classnames'
import classes from './ListCard.scss'

const ListCard = (props) => {
  const { children, className } = props
  return (
    <div className={classNames(className, classes.ListCard)} {...props}>
      {children}
    </div>
  )
}

ListCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default ListCard
