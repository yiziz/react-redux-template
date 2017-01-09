import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default class TextInput extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    formData: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || ""
    }
  }

  onChange = (e) => {
    const parentOnChange = this.props.onChange
    const { value } = e.target
    this.setState({
      value
    })
    parentOnChange && parentOnChange(e)
    this.setFormData(value)
  }

  setFormData = (value) => {
    const { formData, name } = this.props
    if (formData) {
      formData[name] = value
    }
  }

  render() {
    const { className, name, ...rest } = this.props
    const { value } = this.state
    return (
      <input
        {...rest}
        className={classNames('text-input', className)}
        type="text"
        value={value}
        name={name}
        onChange={this.onChange}
      />
    )
  }
}
