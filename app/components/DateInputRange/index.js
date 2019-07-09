import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import {Glyphicon, FormGroup, ControlLabel} from 'react-bootstrap'

import 'react-day-picker/lib/style.css'

// import {formatDate, parseDate} from 'react-day-picker/moment'

// Style
import './styles'
import CleanableDatePickerInput from '../CleanableDatePickerInput'

const MONTHS = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
];
const WEEKDAYS_LONG = [
  '日曜日',
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日'
];
const WEEKDAYS_SHORT = ['日', '月', '火', '水', '木', '金', '土'];

export default class DateInputRange extends React.Component {
  constructor(props) {
    super(props)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.state = {
      locale: 'ja',
      format: 'YYYY-MM-DD'
    }
  }

  componentDidMount() {
    let {from, to, format} = this.props
    format = format || this.state.format
    if (from) {
      const d = moment(from, format)
      if (d.isValid()) {
        from = d.toDate()
      } else {
        from = null
        if (this.props.onChangeFrom) {
          this.props.onChangeFrom('')
        }
      }
    }
    if (to) {
      const d = moment(to, format)
      if (d.isValid()) {
        to = d.toDate()
      } else {
        to = null
        if (this.props.onChangeTo) {
          this.props.onChangeTo('')
        }
      }
    }

    this.setState({
      from, to
    })
  }

  componentWillReceiveProps(nextProps) {
    let {from, to, format} = nextProps
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    format = format || this.state.format
    if (from && from.match(dateRegex)) {
      const d = moment(from, format)
      if (d.isValid()) {
        from = d.toDate()
      } else {
        from = null
      }
    }
    if (to && to.match(dateRegex)) {
      const d = moment(to, format)
      if (d.isValid()) {
        to = d.toDate()
      } else {
        to = null
      }
    }

    this.setState({
      from, to
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  focusTo() {
    // Focus to `to` field. A timeout is required here because the overlays
    // already set timeouts to work well with input fields
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0)
  }

  showFromMonth() {
    const {from, to} = this.state
    if (!from) {
      return
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }

  validate(from, to) {
    const fromDate = from && moment(from, this.props.format)
    const toDate = to && moment(to, this.props.format)

    if ((fromDate && !fromDate.isValid()) || (toDate && !toDate.isValid())) {
      this.setState({
        validationState: 'error',
        message: 'invalid date format!'
      })
    } else if (fromDate && toDate && fromDate > toDate) {
      this.setState({
        validationState: 'error',
        message: 'invalid date range!'
      })
    } else {
      this.setState({
        validationState: null,
        message: null
      })
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({from}, () => {
      if (!this.state.to) {
        this.focusTo()
      }
    })

    if (this.props.validate) {
      this.validate(from, this.state.to)
    }

    if (this.props.onChangeFrom) {
      this.props.onChangeFrom(from ? moment(from).format(this.state.format) : '')
    }
  }

  handleToChange(to) {
    this.setState({to}, this.showFromMonth)

    if (this.props.validate) {
      this.validate(this.state.from, to)
    }

    if (this.props.onChangeTo) {
      this.props.onChangeTo(to ? moment(to).format(this.state.format) : '')
    }
  }

  handleOnChangeFrom(from) {
    if (this.props.onChangeFrom) {
      this.props.onChangeFrom(from)
    }
  }

  handleOnChangeTo(to) {
    if (this.props.onChangeTo) {
      this.props.onChangeTo(to)
    }
  }

  render() {
    const {from, to, format} = this.state
    const modifiers = {start: from, end: to}

    const validationState = this.props.validationState || this.state.validationState

    const getSelectedDay = () => {
      const dates = []
      if (from && typeof from !== 'string') {
        dates.push(from)
      }

      if (to && typeof to !== 'string' && dates.length > 0) {
        dates.push({from, to})
      }

      if (dates.length === 1) {
        return from
      }

      return dates.length && dates
    }

    return (
      <div className="InputFromTo">
        <FormGroup
          validationState={validationState}>
          <div className="date-input-design">
            <CleanableDatePickerInput className="dpibl w100p date-input" inputProps={{className: "form-control"}}
              value={from}
              placeholder={this.props.fromPlaceHolder || 'From'}
              format={format}
              // formatDate={formatDate}
              // parseDate={parseDate}
              dayPickerProps={
                {
                  months: MONTHS,
                  weekdaysLong: WEEKDAYS_LONG,
                  weekdaysShort: WEEKDAYS_SHORT,
                  selectedDays: getSelectedDay(),
                  disabledDays: to && typeof to !== 'string' && {after: to},
                  modifiers,
                  toMonth: to && typeof to !== 'string' && to,
                  numberOfMonths: 2
                }
              }
              onDayChange={this.handleFromChange}
              onChange={::this.handleOnChangeFrom}/>
              <div className="cell-tb pdl5 pdr5">
              <Glyphicon glyph="calendar" className="text-muted mgl5" />
            </div>
            <div className="cell-tb pdr5">～</div>
            <CleanableDatePickerInput className="dpibl w100p date-input" inputProps={{className: "form-control"}}
              ref={el => (this.to = el && el.ref)}
              value={to}
              placeholder={this.props.toPlaceHolder || 'To'}
              format={format}
              // formatDate={formatDate}
              // parseDate={parseDate}
              dayPickerProps={
                {
                  months: MONTHS,
                  weekdaysLong: WEEKDAYS_LONG,
                  weekdaysShort: WEEKDAYS_SHORT,
                  selectedDays: getSelectedDay(),
                  disabledDays: from && typeof from !== 'string' && {before: from},
                  modifiers,
                  month: from && typeof from !== 'string' && from,
                  fromMonth: from && typeof from !== 'string' && from,
                  numberOfMonths: 2
                }
              }
              onDayChange={this.handleToChange}
              onChange={::this.handleOnChangeTo}/>
            <div className="cell-tb pdr5">
              <Glyphicon glyph="calendar" className="text-muted mgl5" />
            </div>
          </div>
          {(validationState === 'error' || validationState === 'warning') && (
            <small className="text-wrap"><ControlLabel>{this.props.message || this.state.message}</ControlLabel></small>
          )}
        </FormGroup>
      </div>
    );
  }
}

DateInputRange.propTypes = {
  validationState: PropTypes.string,
  message: PropTypes.string,
  validate: PropTypes.bool,
  format: PropTypes.string
}


