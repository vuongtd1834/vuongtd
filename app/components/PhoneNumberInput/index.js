import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import {FormControl} from 'react-bootstrap'

export default class PhoneNumberInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numericOnly: typeof props.numericOnly !== 'undefined' ? props.numericOnly : false
    }
  }

  componentWillMount () {
    this.computePart(this.props.value || '')
  }

  _handleChange (name, e) {
    this.computePart(this.getValue(name, e))

    // Call the parent objects 'onChange' method only if defined
    if (this.props.onChange) {
      this.props.onChange(this.getValue())
    }
  }

  getPart (name) {
    return ReactDom.findDOMNode(this.refs[name]).value
  }

  getValue (name, e) {
    // We need to merge the 3 distinct parts into a single phone number
    let result = ''
    console.log('11111111111111111')
    console.log(e && e.target.value)
    this.state.parts.forEach(part => {
      result += name && name === part.name ? e.target.value : this.getPart(part.name)
    })
    return result
  }

  _handleKeyPress (e) {
    if (!this.state.numericOnly ||
      // Allow: backspace, delete, tab, escape, enter
      e.charCode === 46 || e.charCode === 8 || e.charCode === 9 ||
      e.charCode === 27 || e.charCode === 13 || e.charCode === 110 ||
      // Allow: Ctrl+A, Command+A
      (e.charCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.charCode >= 35 && e.charCode <= 40)) {
      // let it happen, don't do anything
      return
    }
    // Ensure that it is a number and stop the keypress
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault()
    }
  }

  _handleKeyUp (name, e) {
    const target = ReactDom.findDOMNode(this.refs[name])

    // 'delete' and input is empty, then go to previous input
    if (e.keyCode === 8 && !ReactDom.findDOMNode(this.refs[name]).value) {
      let previous = target
      while ((previous = previous.previousElementSibling)) {
        if (previous === null) {
          break
        }
        if (previous.tagName.toLowerCase() === 'input') {
          previous.focus()
          break
        }
      }
    }

    // if tab, left, or right just exit
    if (e.keyCode === 9 || e.keyCode === 16 ||
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      return
    }

    const maxLength = parseInt(target.attributes.maxlength.value, 10)
    const myLength = target.value.length

    if (myLength >= maxLength) {
      let next = target
      while ((next = next.nextElementSibling)) {
        if (next === null) {
          break
        }
        if (next.tagName.toLowerCase() === 'input') {
          next.focus()
          break
        }
      }
    }
  }

  computePart (value) {
    const len = value.length
    console.log(len)
    const parts = []
    let remain = value

    if (len < 10) {
      parts[0] = {
        name: `part${0}`,
        max: 2,
        value: value.substr(0, 2)
      }
      remain = value.substr(2)
    } else {
      parts[0] = {
        name: `part${0}`,
        max: 3,
        value: value.substr(0, 3)
      }
      remain = value.substr(3)
    }

    parts[1] = {
      name: `part${1}`,
      max: 3,
      value: remain.substr(0, 3)
    }

    parts[2] = {
      name: `part${2}`,
      max: 5,
      value: remain.substr(3, 4)
    }

    console.log(value)
    console.log(parts)
    if (len <= 10) {
      this.setState({parts})
    }
  }

  render () {
    const renderPart = (name, length, value, placeholder) => {
      const style = {
        ...(this.props.inputStyle || {}),
        width: (4 * 15),
        display: 'inline-block'
      }

      return (
        <FormControl
          type='text' className={this.props.inputClass}
          style={style}
          name={name} ref={name} maxLength={length}
          value={value}
          onChange={e => this._handleChange(name, e)}
          placeholder={placeholder}
          onKeyPress={e => this._handleKeyPress(e)}
          onKeyUp={e => this._handleKeyUp(name, e)} />
      )
    }

    const renderAll = () => {
      const parts = this.state.parts
      const results = [(
        renderPart(parts[0].name, parts[0].max, parts[0].value)
      )]

      for (let i = 1; i < parts.length; i++) {
        results.push((
          <span style={{padding: '0px 10px'}}>-</span>
        ))
        results.push(renderPart(parts[i].name, parts[i].max, parts[i].value))
      }

      return results
    }

    return (
      <div>
        {renderAll()}
      </div>
    )
  }
}

PhoneNumberInput.propTypes = {
  value: PropTypes.string,
  parts: PropTypes.number,
  inputClass: PropTypes.string,
  onChanged: PropTypes.fnc
}
