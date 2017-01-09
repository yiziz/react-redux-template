import React, { PropTypes } from 'react'
import classNames from 'classnames'

import classes from './Select.scss'

export default class Select extends React.Component {
  static propTypes = {
    choices: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    className: PropTypes.string,
    selected: PropTypes.string,
  }

  onClick = (e) => {
    const { onSelect } = this.props
    const button = e.target
    const { textContent } = button
    onSelect && onSelect(textContent)
  }

  render() {
    const { choices, selected, className, ...rest } = this.props
    return (
      <div className={classNames(classes.select, className)} {...rest}>
        {
          choices.map((s) => {
            return (
              <button key={s} className={classNames({ selected: selected === s })} onClick={this.onClick}>{s}</button>
            )
          })
        }
      </div>
    )
  }
}
