import React from 'react'

export default class InputNum extends React.Component {
  constructor(props) {
    super(props)
    let { min, value } = this.props
    if (!value && +min >= 0) {
      value = min
    }
    this.state = { value }
  }

  handleBlur = (e) => {
    const { max, min, onBlur } = this.props
    let value = parseFloat(e.target.value)
    if (Number.isNaN(value)) {
      if (Number.isNaN(min)) {
        value = ''
      } else {
        value = min
      }
    } else if (value > +max) {
      value = max
    } else if (value < +min) {
      value = min
    }
    this.setState({ value })
    this.triggerChange(value)
    onBlur && onBlur(value)
  }

  handleChange = (e) => {
    const { max } = this.props
    let value = parseFloat(e.target.value)
    if (value > +max) {
      value = max
    } else if (Number.isNaN(value)) {
      // 允许全部删除
      value = ''
    }
    this.triggerChange(value)
    this.setState({ value })
  }

  triggerChange(value) {
    const { onChange } = this.props
    if (onChange && this.state.value !== value) {
      onChange(value)
    }
  }

  render() {
    return (
      <input
        type="tel"
        {...this.props}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}
