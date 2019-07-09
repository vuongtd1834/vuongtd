import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap'
import _ from 'lodash'

import CleanableInput from '../CleanableInput'

export default class LimitedLengthInput extends PureComponent {
  constructor(props) {
    super(props)
    const value = this.props.defaultValue || this.props.value
    this.state = {
      value: value || '',
      currentLength: value ? `${value}`.replace(/(?:\r\n|\r|\n)/g, '').length : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value,
        currentLength: `${nextProps.value}`.replace(/(?:\r\n|\r|\n)/g, '').length
      })
    }
  }

  componentDidUpdate() {
    // if (this.refs.textArea) {
    //   this.selectionEnd = ReactDOM.findDOMNode(this.refs.textArea)
    //   this.selectionEnd.addEventListener("keypress", e => {
    //     const lengValue = this.state.value.replace(/\r\n|\r|\n/g, '  ').length
    //     if ((lengValue + 1) > this.props.maxLength || (e.keyCode === 13 && (lengValue + 2) > this.props.maxLength)) {
    //       if (this.selectionEnd.selectionStart === this.selectionEnd.selectionEnd) {
    //         e.preventDefault();
    //         this.selectionEnd.setSelectionRange(this.selectionEnd.selectionStart, this.selectionEnd.selectionEnd)
    //       } else if (e.keyCode === 13 && (this.selectionEnd.selectionStart + 1) >= this.selectionEnd.selectionEnd) {
    //         e.preventDefault();
    //         this.selectionEnd.setSelectionRange(this.selectionEnd.selectionStart, this.selectionEnd.selectionEnd)
    //       }
    //     }
    //   })
    // }
    if (this.selectionElement && this.event && this.isFieldAreaChange) {
      this.event.preventDefault();
      this.selectionElement.setSelectionRange(this.selectionStart, this.selectionEnd)
      this.isFieldAreaChange = false
    }
  }

  handleChanged(event) {
    let value = event.target.value
    this.event = event
    this.isFieldAreaChange = true
    this.setState({
      currentLength: value.length
    })
    this.selectionElement = ReactDOM.findDOMNode(this.refs.textArea)
    if (this.selectionElement) {
      this.selectionStart = this.selectionElement.selectionStart
      this.selectionEnd = this.selectionElement.selectionEnd
    }
    if (value.replace(/\r\n|\r|\n/g, '  ').length > this.props.maxLength) {
      if ((this.state.value.length + 2) >= value.length) {
        if (this.selectionElement) {
          this.selectionEnd = this.selectionElement.selectionEnd - 1
        }
        this.props.onChange(this.state.value)
      } else {
        let valueCopy = ""
        value = value.split("").forEach(item => {
          if (`${valueCopy.replace(/\r\n|\r|\n/g, '  ')}${item}`.length <= this.props.maxLength) {
            valueCopy += item
          }
        })
        this.state.value = valueCopy
        this.props.onChange(valueCopy)
      }
    } else {
      this.props.onChange(value)
      this.state.value = value
    }
  }

  handleChangedForm(value) {
    this.props.onChange(value)
    this.isFieldAreaChange = false
  }
  render() {
    return (
      <FormGroup validationState={this.props.validationState} className={this.props.className || ''}>
        <div className="limited-length-input">
          {this.props.componentClass === 'textarea' ? (
            <FormControl {...this.props} maxLength={this.props.maxLength} ref="textArea" className="" onChange={event => this.handleChanged(event)} />
          ) : (
              <CleanableInput {...this.props} validationState={null} maxLength={this.props.maxLength} className="" onChange={value => this.handleChangedForm(value)} />
            )}

          <div className="mgt5">
            {(this.props.validationState && this.props.validationState !== 'success') && (
              <span className="float-left text-wrap"><small><ControlLabel>{this.props.message}</ControlLabel></small></span>
            )}
            {
              this.props.requireTextCount && <span className="text-primary-1 float-right small">
                {`${this.state.currentLength + (_.get(this.props, 'value', '').split(/\r\n|\r|\n/).length - 1) * 2}文字/${this.props.maxLength}`}文字
              </span>
            }
          </div>
        </div>
      </FormGroup>
    )
  }
}

LimitedLengthInput.propTypes = {
  componentClass: PropTypes.string,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
  validationState: PropTypes.string,
  message: PropTypes.string
}
