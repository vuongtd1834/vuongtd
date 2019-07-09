import React, {PureComponent} from 'react'
import {Checkbox} from 'react-bootstrap'
import PropTypes from 'prop-types'

import CheckboxGroup from './Group'

export default class BTCheckbox extends PureComponent {
  static Group = CheckboxGroup

  static contextTypes = {
    checkboxGroup: PropTypes.shape({
      onChangeAll: PropTypes.func,
      groupCheckAll: PropTypes.bool
    })
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: false
    }
  }

  componentDidMount() {
    const props = this.props
    const context = this.context
    if (props.checked || props.defaultChecked || (context.checkboxGroup && context.checkboxGroup.groupCheckAll)) {
      this.setState({
        checked: props.checked || props.defaultChecked || (context.checkboxGroup && context.checkboxGroup.groupCheckAll)
      })
      this.onChange({checked: true, value: this.props.value})
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      })
      this.onChange({checked: nextProps.checked, value: this.props.value})
    } else if (nextContext.checkboxGroup) {
      this.setState({
        checked: nextContext.checkboxGroup.groupCheckAll
      })

      // not change from CheckAll --> don't call onChangeAll
      if (this.props.onChange && this.state.checked !== nextContext.checkboxGroup.groupCheckAll) {
        this.props.onChange(nextContext.checkboxGroup.groupCheckAll, this.props.value)
      }
    }
  }

  handleOnChanged(e) {
    this.setState({
      checked: e.target.checked
    })

    this.onChange({checked: e.target.checked, value: e.target.value})
  }

  onChange({checked, value}) {
    const {checkboxGroup} = this.context

    if (this.props.onChange && this.state.checked !== checked) {
      this.props.onChange(checked, typeof this.props.value !== 'undefined' ? this.props.value : value)
    }

    if (checkboxGroup.onChangeAll && this.state.checked !== checked) {
      checkboxGroup.onChangeAll({checked, value: typeof this.props.value !== 'undefined' ? this.props.value : value})
    }
  }

  render() {
    return (
      <Checkbox {...this.props} checked={this.state.checked} onChange={::this.handleOnChanged}/>
    )
  }
}
