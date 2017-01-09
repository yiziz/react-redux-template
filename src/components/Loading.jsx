import React, { PropTypes } from 'react'
import classNames from 'classnames'

export const Loading = (props={}) => {
  const { children, loading, size, ...rest } = props
  return (
    <div {...rest} style={{ textAlign: loading ? 'center' : 'left' }}>
      { loading ? <i className={classNames("fa fa-circle-o-notch fa-spin", `fa-${size}x`)} /> : children }
    </div>
  )
}

Loading.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  size: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  size: 2,
}

export default Loading
