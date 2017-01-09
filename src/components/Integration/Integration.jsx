import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { DropTarget } from 'react-dnd'
import classes from './Integration.scss'

const searchResultTarget = {
  canDrop(props, monitor) {
    // console.log('canDrop')
    return true
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.
    // console.log('hover')

    // You can check whether we're over a nested drop target
    monitor.isOver({ shallow: true })

    // You will receive hover() even for items for which canDrop() is false
    monitor.canDrop()
  },

  drop(props, monitor, component) {
    // console.log('drop')
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return undefined
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    // console.log(item)
    return { moved: true }
  }
}

function targetCollect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class Integration extends React.Component {
  static propTypes = {
    action: PropTypes.string,
    canDrop: PropTypes.bool,
    connectDropTarget: PropTypes.func.isRequired,
    imgSrc: PropTypes.string,
    isOver: PropTypes.bool,
    isOverCurrent: PropTypes.bool,
    name: PropTypes.string
  }

  style = () => {
    const { imgSrc } = this.props
    return {
      backgroundImage: `url("${imgSrc}")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }

  render() {
    const { action, canDrop, connectDropTarget, isOver, name } = this.props
    const open = isOver && canDrop
    console.log('isOver: ', isOver)
    return connectDropTarget(
      <div className={classes.dropTarget}>
        <div className={classNames(classes.Integration, { open })}
          style={this.style()}
        >
          <div className={classNames(classes.IntegrationBubble, { open, canDrop })}></div>
          <div className={classNames(classes.IntegrationAction, { open })}>
            {action}
          </div>
          <div className={classes.IntegrationName}>{name}</div>
        </div>
      </div>
    )
  }
}

export default DropTarget('SearchResult', searchResultTarget, targetCollect)(Integration)
