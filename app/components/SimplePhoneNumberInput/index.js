import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {FormControl, Form, FormGroup, ControlLabel} from 'react-bootstrap'

export default class SimplePhoneNumberInput extends Component {
  static propTypes = {
    validationState: PropTypes.string,
    message: PropTypes.string
  }

  constructor(props) {
    super(props)
    const propsPhone = props.value && props.value.split("-")
    this.state = {
      part1: propsPhone && propsPhone[0] ? propsPhone[0] : '',
      part2: propsPhone && propsPhone[1] ? propsPhone[1] : '',
      part3: propsPhone && propsPhone[2] ? propsPhone[2] : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const propsPhone = nextProps.value && nextProps.value.split("-")
      this.setState({
        part1: propsPhone && propsPhone[0] ? propsPhone[0] : '',
        part2: propsPhone && propsPhone[1] ? propsPhone[1] : '',
        part3: propsPhone && propsPhone[2] ? propsPhone[2] : ''
      })
    }
  }

  convertValue(value) {
    let valueChange = ""
    value.split("").forEach(japanChar => {
      switch (japanChar) {
        case "０":
          valueChange += "0"
          break;
        case "１":
          valueChange += "1"
          break;
        case "２":
          valueChange += "2"
          break;
        case "３":
          valueChange += "3"
          break;
        case "４":
          valueChange += "4"
          break;
        case "５":
          valueChange += "5"
          break;
        case "６":
          valueChange += "6"
          break;
        case "７":
          valueChange += "7"
          break;
        case "８":
          valueChange += "8"
          break;
        case "９":
          valueChange += "9"
          break;
        default:
          valueChange += japanChar
      }
    });
    return valueChange;
  }

  componentDidUpdate() {
    if (this.part && this.event && this.isFieldChange) {
        this.part.setSelectionRange(this.selectionStart, this.selectionStart)
        this.isFieldChange = false
        this.check = false
    }
  }

  handleChange(name, event) {
    const part = ReactDOM.findDOMNode(this.refs[name])
    const value = this.convertValue(event.target.value)
    this.isFieldChange = true
    this.event = event
    this.part = part
    if ((name === 'part1' && value.length > 5) || (name === 'part2' && value.length > 4) || (name === 'part3' && value.length > 4)) {
      this.selectionStart = part.selectionStart - 1
      // đoạn này phải set lại state để componentDidUpdate chạy lại
      this.setState({
        [name]: this.state[name]
      })
    }
    if (value === '') {
      this.setState({
        [name]: value
      })

      if (this.props.onChange) {
        this.state[name] = value
        if (!this.state.part1 && !this.state.part2 && !this.state.part3) {
          this.props.onChange(null)
        } else {
          const resultArr = [this.state.part1 || '', this.state.part2 || '', this.state.part3 || '']
          const result = resultArr.join("-")
          this.props.onChange(result)
        }
      }
    } else {
      const reg = new RegExp('^[0-9]+$')
      if (reg.test(value)) {
        if (value.length <= part.getAttribute('maxLength')) {
          this.setState({
            [name]: value
          })
          if (this.props.onChange) {
            this.selectionStart = part.selectionStart
            this.state[name] = value
            if (!this.state.part1 && !this.state.part2 && !this.state.part3) {
              this.props.onChange(null)
            } else {
              const resultArr = [this.state.part1 || '', this.state.part2 || '', this.state.part3 || '']
              const result = resultArr.join("-")
              this.props.onChange(result)
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <Form inline>
        <FormGroup
          validationState={this.props.validationState}>
          <FormControl className="w75px" type="tel" maxLength={5} value={this.state.part1}
                       onChange={e => this.handleChange("part1", e)} ref="part1"/>
          <span style={{padding: '0px 10px'}}>-</span>
          <FormControl className="w65px" type="tel" maxLength={4} value={this.state.part2}
                       onChange={e => this.handleChange("part2", e)} ref="part2"/>
          <span style={{padding: '0px 10px'}}>-</span>
          <FormControl className="w65px" type="tel" maxLength={4} value={this.state.part3}
                       onChange={e => this.handleChange("part3", e)} ref="part3"/>
          {(this.props.validationState && this.props.validationState !== 'success') && (
            <div className="mgt5 text-wrap">
              <small><ControlLabel>{this.props.message}</ControlLabel></small>
            </div>
          )}
        </FormGroup>
      </Form>
    )
  }
}

