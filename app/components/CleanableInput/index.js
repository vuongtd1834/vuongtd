import React from 'react'
import PropTypes from 'prop-types'

import {FormGroup, Glyphicon, ControlLabel} from 'react-bootstrap'

import BTInput from '../BTInput'
import './styles'

const labelStypes = {
  top: {
    // position: 'absolute',
    left: 0,
    top: -20
  },
  bottom: {
    // position: 'absolute',
    left: 0,
    bottom: -25
  },
  left: {
    display: 'table-cell',
    paddingRight: 10,
    verticalAlign: 'middle'
  }
}

const formGroupStyles = {
  left: {
    display: 'table',
    width: '100%'
  }
}

const formControlStyles = {
  left: {
    display: 'table-cell'
  }
}

export default class CleanableInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || this.props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && typeof nextProps.value !== 'undefined') {
      this.setState({value: nextProps.value})
    }
  }

  cleatTextInput(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    this.setState({
      value: ''
    })

    if (this.props.onChange) {
      this.props.onChange('')
    }

    return true;
  }

  handleOnChange(e) {
    this.setState({
      value: e.target.value
    })

    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }

    if (this.props.validator) {
      const validateResult = this.props.validator(e.target.value)
      if (validateResult.result !== 'success') {
        this.setState({
          validationState: validateResult.result,
          message: validateResult.message
        })
      } else {
        this.setState({
          validationState: null,
          message: null
        })
      }
    }
  }

  render() {
    const validationState = this.props.validationState || this.state.validationState
    return (
      <FormGroup
        className={`input-clear-text ${this.props.className || ''}`}
        validationState={validationState}
        style={formGroupStyles[this.props.messagePosition]}
      >
        <div className="psrelative">
          <BTInput {...this.props} value={this.state.value} onChange={::this.handleOnChange} className={`input-text`}
                   style={formControlStyles[this.props.messagePosition]}/>
          {
            (this.state.value !== '' && this.props.componentClass !== 'textarea') &&
            <div className="remove-icon"><Glyphicon glyph="remove" onClick={e => this.cleatTextInput(e)}/></div>
          }
        </div>
        {validationState && (
          <div style={labelStypes[this.props.messagePosition]} className="dpinbl text-wrap">
            <small><ControlLabel>{this.props.message || this.state.message}</ControlLabel></small>
          </div>
        )}
      </FormGroup>
    )
  }
}

CleanableInput.propTypes = {
  validationState: PropTypes.string,
  message: PropTypes.string,
  defaultValue: PropTypes.string,
  messagePosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  validator: PropTypes.func,
  onEnter: PropTypes.func
}
