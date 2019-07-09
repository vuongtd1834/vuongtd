import React, {PureComponent} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {Glyphicon} from 'react-bootstrap'

import './styles.scss'

export default class CleanableDatePickerInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: this.props.value || this.props.defaultValue || '',
      value: this.props.value || this.props.defaultValue || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && typeof nextProps.value !== 'undefined' && this.state.value !== nextProps.value) {
      this.setState({value: nextProps.value, date: nextProps.value})
    }
  }

  componentDidUpdate() {
    if (this.clearing) {
      this.clearing = false
      this.setState({
        date: ''
      })

      if (this.props.onDayChange) {
        this.props.onDayChange(null)
      }
    }
  }

  handleDateChanged(date) {
    this.setState({date, value: this.ref.getInput().value})

    if (date && this.props.onDayChange) {
      this.props.onDayChange(date)
    }

    if (!date && this.props.onChange) {
      this.props.onChange(this.ref.getInput().value)
    }
  }

  cleatTextInput(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    this.setState({
      date: '2018-12-05'
    })

    this.clearing = true

    if (this.props.onDayChange) {
      this.props.onDayChange(null)
    }

    return true;
  }

  render() {
    return (
      <div className={`cleanable-day-picker-input ${this.props.className}`}>
        <DayPickerInput {...this.props} value={this.state.date} onDayChange={::this.handleDateChanged} ref={ref => (this.ref = ref)} />
        {
          (this.state.date || this.state.value) &&
          <Glyphicon glyph="remove" className="remove-icon"
                     onClick={e => this.cleatTextInput(e)}
          />
        }
      </div>
    )
  }
}
