import React from 'react'
import PropTypes from 'prop-types'

import {Glyphicon, FormGroup, ControlLabel} from 'react-bootstrap'
// Style
import './styles'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker} from 'react-dates'

import moment from 'moment'

moment.locale('ja')
moment.updateLocale('ja', {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  weekdaysMin: ['日', '月', '火', '水', '木', '金', '土']
})

export default class DateInputRange extends React.Component {
  static propTypes = {
    startDate: PropTypes.func.object,
    endDate: PropTypes.func.object,
    onDatesChange: PropTypes.func.isRequired,
    startDatePlaceholderText: PropTypes.string,
    endDatePlaceholderText: PropTypes.string
  }

  static defaultProps = {
    startDatePlaceholderText: '開始日',
    endDatePlaceholderText: '終了日',
    startDate: null,
    endDate: null
  }

  constructor(props) {
    super(props)
    this.state = {
      format: 'YYYY-MM-DD',
      startDate: null,
      endDate: null,
      focusedInput: null,
      params: {
        startDate: null,
        endDate: null
      },
      dateRemove: ''
    }
    this.eventList = []
  }

  /**
   * Convert date object to formated-string
   */
  getFormatedDate(value) {
    const date = moment(value)
    return date.isValid() ? date.format(this.state.format) : null
  }

  /**
   * Convert formated-string to date object
   */
  getDate(str) {
    const date = moment(str, this.state.format)
    return date.isValid() ? date : null
  }

  componentWillMount() {
    const {startDate, endDate} = this.props
    this.setState({
      startDate: this.getDate(startDate),
      endDate: this.getDate(endDate)
    })
  }

  componentWillReceiveProps(nextProps) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (nextProps.startDate !== this.props.startDate || nextProps.endDate !== this.props.endDate) {
      if (nextProps.startDate && nextProps.startDate.match(dateRegex)) {
        const startDate = moment(nextProps.startDate, this.state.format)
        if (startDate.isValid()) {
          this.setState({
            startDate: this.getDate(startDate)
          })
        }
      }
      if (nextProps.endDate && nextProps.endDate.match(dateRegex)) {
        const endDate = moment(nextProps.endDate, this.state.format)
        if (endDate.isValid()) {
          this.setState({
            endDate: this.getDate(endDate)
          })
        }
      }
      this.setState({
        params: {
          endDate: nextProps.endDate,
          startDate: nextProps.startDate
        }
      })
    }
    if (!nextProps.startDate && nextProps.reset) {
      this.setState({
        startDate: null
      }, () => {
        this.handleEventRemoveDateText('startDate')
      })
    }
    if (!nextProps.endDate && nextProps.reset) {
      this.setState({
        endDate: null
      }, () => {
        this.handleEventRemoveDateText('endDate')
      })
    }
  }

  handleDateParamsChange(dateId, value) {
    const key = dateId.replace(`${this.props.id}`, '')
    if (typeof value === 'string') {
      this.setState(prevState => ({
        params: {
          ...prevState.params,
          [key]: value
        }
      }))

    }
  }

  componentDidUpdate() {
    if (this.clearing) {
      this.clearing = false
      if (this.state.dateRemove === 'startDate') {
        this.handleEventRemoveDateText('startDate')
      } else {
        this.handleEventRemoveDateText('endDate')
      }
    }
  }

  handleEventRemoveDateText(dateId) {
    const input = document.getElementById(`${dateId}${this.props.id}`)
    const lastValue = input.value;
    input.value = ''
    const event = new CustomEvent('input', {bubbles: true})
    event.simulated = true
    const tracker = input._valueTracker
    if (tracker) {
      tracker.setValue(lastValue)
    }
    input.dispatchEvent(event)
  }

  cleatTextInput(e, date) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    if (date === 'startDate') {
      this.setState({startDate: null, dateRemove: date, params: {startDate: ''}})
      const strEndDate = this.getFormatedDate(this.state.endDate)
      if (this.props.onDatesChange) {
        this.props.onDatesChange(null, strEndDate || this.state.params.endDate)
      }
    } else if (date === 'endDate') {
      this.setState({endDate: null, dateRemove: date, params: {endDate: ''}})
      const strStartDate = this.getFormatedDate(this.state.startDate)
      if (this.props.onDatesChange) {
        this.props.onDatesChange(strStartDate || this.state.params.startDate, null)
      }
    }
    this.clearing = true
    this.dateRemove = date
    return true;
  }

  handlerChangeDate(startDate, endDate) {
    this.state.startDate = startDate
    this.state.endDate = endDate
    const strStartDate = this.getFormatedDate(startDate)
    const strEndDate = this.getFormatedDate(endDate)
    if (this.props.onDatesChange) {
      if (typeof strStartDate === 'string' && typeof strEndDate === 'string') {
        this.props.onDatesChange(strStartDate, strEndDate)
      } else if (typeof strStartDate === 'string' && !strEndDate) {
        this.props.onDatesChange(strStartDate, this.state.params.endDate)
      } else if (typeof strEndDate === 'string' && !strStartDate) {
        this.props.onDatesChange(this.state.params.startDate, strEndDate)
      } else if (!strStartDate && !strEndDate) {
        this.props.onDatesChange(this.state.params.startDate, this.state.params.endDate)
      }
    }
  }

  render() {
    const validationState = this.props.validationState || this.state.validationState
    return (
      <FormGroup className="nm"
        validationState={validationState}>
        <div className="input-date-range"
          onChange={inputValue => this.handleDateParamsChange(inputValue.target.id, inputValue.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter' && this.props.onEnter) {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              e.preventDefault()
              this.props.onEnter()
            }
          }}>
          <DateRangePicker
            {...this.props}
            startDateId={`startDate${this.props.id}`}
            endDateId={`endDate${this.props.id}`}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({startDate, endDate}) => {
              this.handlerChangeDate(startDate, endDate)
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({focusedInput})}
            displayFormat={this.state.format}
            customArrowIcon={<span style={{margin: '0 5px'}}>～</span>}
            showDefaultInputIcon
            inputIconPosition="after"
            small
            numberOfMonths={1}
            noBorder
            hideKeyboardShortcutsPanel
            isOutsideRange={() => false}
            renderDayContents={day => <span>{day.format('D')}</span>}
            monthFormat="YYYY/MM"
            daySize={30}
            minimumNights={0}
            isDayHighlighted={day => day.isSame(moment(), 'd' )}
          />
          {/* {(this.state.startDate || this.props.startDate) && <span className="btn-remove btn-remove-from" onClick={e => {
            this.cleatTextInput(e, "startDate")
          }}><Glyphicon glyph="remove" /></span>}
          {(this.state.endDate || this.props.endDate) && <span className="btn-remove btn-remove-to" onClick={e => {
            this.cleatTextInput(e, "endDate")
          }}><Glyphicon glyph="remove" /></span>} */}
          {this.state.params.startDate && <span className="btn-remove btn-remove-from" onClick={e => {
            this.cleatTextInput(e, "startDate")
          }}><Glyphicon glyph="remove" /></span>}
          {this.state.params.endDate && <span className="btn-remove btn-remove-to" onClick={e => {
            this.cleatTextInput(e, "endDate")
          }}><Glyphicon glyph="remove" /></span>}
        </div>
        {(validationState === 'error' || validationState === 'warning') && (
          <small className="text-wrap"><ControlLabel>{this.props.message || this.state.message}</ControlLabel></small>
        )}
      </FormGroup>
    )
  }
}

