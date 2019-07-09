import React, {PureComponent} from 'react'
import {Checkbox} from 'react-bootstrap'
import PropTypes from 'prop-types'

import CheckboxGroup from './Group'
import CheckAll from './CheckAll'

export default class BTCheckbox extends PureComponent {
  static Group = CheckboxGroup
  static CheckAll = CheckAll

  static contextTypes = {
    checkboxGroup: PropTypes.any
  }

  static propTypes = {
    checkAllElement: PropTypes.bool
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


      this.onChange(true, this.props.value)
      // const {checkboxGroup} = this.context
      // const onChange = this.props.onChange || (checkboxGroup && checkboxGroup.onChange)
      // onChange({checked: true, value: this.props.value})
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      })
      this.onChange(nextProps.checked, this.props.value)
      return
    }

    if ((nextContext.checkboxGroup && nextContext.checkboxGroup.groupCheckAll) !== (this.context.checkboxGroup && this.context.checkboxGroup.groupCheckAll)) {
      if (nextContext.checkboxGroup && nextContext.checkboxGroup.groupCheckAll) {
        this.setState({
          checked: true
        })
        this.onChange(true, this.props.value)
      } else if (nextContext.checkboxGroup && nextContext.checkboxGroup.groupUnCheckAll) {
        this.setState({
          checked: false
        })

        this.onChange(false, this.props.value)
      }
    }
  }

  handleOnChanged(e) {
    this.setState({
      checked: e.target.checked
    })

    this.onChange(e.target.checked, e.target.value)
  }

  onChange(checked, value) {
    const {checkboxGroup} = this.context
    if (this.props.onChange) {
      this.props.onChange(checked, typeof this.props.value !== 'undefined' ? this.props.value : value)
    }

    if (checkboxGroup && checkboxGroup.onChange) {
      checkboxGroup.onChange({checked: checked, value: typeof this.props.value !== 'undefined' ? this.props.value : value})
    }
  }

  render() {
    return (
      <Checkbox {...this.props} checked={this.state.checked} onChange={::this.handleOnChanged}/>
    )
  }
}
