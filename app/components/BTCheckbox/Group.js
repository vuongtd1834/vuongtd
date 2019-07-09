import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class Group extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkedValue: new Set(props.defaultCheckedValues || []),
      checkAll: false,
      unCheckAll: false
    }
  }

  static childContextTypes = {
    checkboxGroup: PropTypes.shape({
      onChange: PropTypes.func,
      onChangeAll: PropTypes.func,
      groupCheckAll: PropTypes.bool,
      groupUnCheckAll: PropTypes.bool
    })
  }

  static propTypes = {
    defaultCheckedValues: PropTypes.array,
    onChange: PropTypes.func
  }

  getChildContext() {
    return {
      checkboxGroup: {
        onChange: this.onCheckboxChange.bind(this),
        onChangeAll: this.onCheckboxChangeAll.bind(this),
        groupCheckAll: this.state.checkAll,
        groupUnCheckAll: this.state.unCheckAll
      }
    }
  }

  onCheckboxChange({checked, value}) {
    let checkAll = this.state.checkAll
    if (checked) {
      this.state.checkedValue.add(value)
    } else {
      this.state.checkedValue.delete(value)
      if (this.state.checkAll) {
        checkAll = false
        this.setState({checkAll: false})
      }
    }

    if (this.props.onChange) {
      if (!checkAll) {
        this.props.onChange([...this.state.checkedValue])
      }
    }
  }

  onCheckboxChangeAll({checked, value}) {
    this.setState({
      checkAll: checked,
      unCheckAll: !checked
    })

    if (this.props.onChange) {
      if (checked) {
        this.props.onChange([value])
      } else {
        this.props.onChange([])
      }
    }
  }

  render() {
    return (
      <div className="checkbox-group">
        {this.props.children}
      </div>
    )
  }
}
