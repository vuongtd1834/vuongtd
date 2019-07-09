import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FormGroup, ControlLabel, Glyphicon, FormControl} from 'react-bootstrap'
import CleanableInput from '../CleanableInput'
import CustomSomeMethod from 'components/CustomSomeMethod'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import _ from 'lodash'

import './styles'

export default class NumberInputRange extends Component {
  constructor(props) {
    super(props)
    const values = this.props.values || this.props.defaultValues || ['', '']
    this.state = {
      currentTimeFrom: 0,
      currentTimeTo: 0,
      from: values[0],
      to: values[1],
      checkFastkeyPress: 0,
      numberMask: createNumberMask({
        prefix: '',
        suffix: '',
        allowLeadingZeroes: true,
        integerLimit: this.props.numberOfLimit || null
      })
    }
    this.from = false
    this.to = false
    this.handlerClearInputData = this.handlerClearInputData.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.values) {
      let tmpFrom = ''
      let tmpTo = ''
      if(_.get(nextProps, 'values[0]', '') !== ''){
        // tmpFrom = Number(_.get(nextProps, 'values[0]', '')).toLocaleString()
        tmpFrom = CustomSomeMethod.toLocaleString(Number(_.get(nextProps, 'values[0]', '')))
      }
      if (_.get(nextProps, 'values[1]', '') !== '') {
        // tmpTo = Number(_.get(nextProps, 'values[1]', '')).toLocaleString()
        tmpTo = CustomSomeMethod.toLocaleString(Number(_.get(nextProps, 'values[1]', '')))
      }
      this.setState({
        from: tmpFrom,
        to: tmpTo
      })
    }
  }

  componentDidUpdate() {
    if (this.ref1 && this.eventFrom && this.state.isFocusFrom === true) {
      this.eventFrom.preventDefault()
      this.ref1.setSelectionRange(this.selectionStartFrom, this.selectionEndFrom)
      this.state.isFocusFrom = false
    }
    if (this.ref2 && this.eventTo && this.state.isFocusTo === true) {
      this.eventTo.preventDefault()
      this.ref2.setSelectionRange(this.selectionStartTo, this.selectionEndTo)
      this.state.isFocusTo = false
    }
  }

  validate(from, to) {
    if (from && to && from > to) {
      this.setState({
        validationState: 'error',
        message: 'invalid range values!'
      })
    } else {
      this.setState({
        validationState: null,
        message: null
      })
    }
  }
  handlerClearInputData(position) {
    this.setState({[position]: ""})
    if(position === "from") {
      this.props.onChanged("", this.state.to.replace(/[^0-9]/g,""))
    } else {
      this.props.onChanged(this.state.from.replace(/[^0-9]/g,""), "")
    }
  }

  convertValue(value) {
    let valueChange = ""
    value.split("").forEach(value => {
      switch (value) {
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
          valueChange += value
      }
    });
    return valueChange;
  }

  handleInputChanged(field, event) {
    let value = this.convertValue(event.target.value)
    let money = "";
      if(field === "from") {
        this.eventFrom = event
        this.state.isFocusFrom = true
      } else {
        this.eventTo = event
        this.state.isFocusTo = true
      }
      if (value !== "" && value.match(/[0-9]/g) !== null) {
        // value = `${Number(value.replace(/[^0-9]/g, "")).toLocaleString()}`.replace(/[\.]/g, ",")
        value = `${CustomSomeMethod.toLocaleString(Number(value.replace(/[^0-9]/g, "")))}`.replace(/[\.]/g, ",")
        if (field === "from") {
          if (value.replace(/[^0-9]/g, "").length <= this.props.numberOfLimit
            && value.length > this.state.from.length && new Date().getTime() - this.state.currentTimeFrom > 100) {
            this.state.currentTimeFrom = new Date().getTime()
            this.selectionStartFrom = this.ref1.selectionStart + (value.length - this.state.from.length - 1)
            this.selectionEndFrom = this.ref1.selectionEnd + (value.length - this.state.from.length - 1)
            money = value;
            this.setState({from: value})
          } else if (event.target.value.length < this.state.from.length) {
            this.selectionStartFrom = this.ref1.selectionStart
            this.selectionEndFrom = this.ref1.selectionEnd
            if (event.target.value.replace(/[^0-9]/g, "").length % 3 == 0 && this.ref1.selectionStart !=0) {
              this.selectionStartFrom = this.ref1.selectionStart - 1
              this.selectionEndFrom = this.ref1.selectionEnd - 1
            }
            money = value;
            setTimeout(() => this.setState({from: value}), 10)
          } else {
            this.selectionStartFrom = this.ref1.selectionStart - 1
            this.selectionEndFrom = this.ref1.selectionEnd - 1
            money = this.state.from !== "0" ? this.state.from : value;
            this.setState({from: money})
          }
        } else {
          if (value.replace(/[^0-9]/g, "").length <= this.props.numberOfLimit
            && value.length > this.state.to.length && new Date().getTime() - this.state.currentTimeTo > 100) {
            this.state.currentTimeTo = new Date().getTime()
            this.selectionStartTo = this.ref2.selectionStart + (value.length - this.state.to.length - 1)
            this.selectionEndTo = this.ref2.selectionEnd + (value.length - this.state.to.length - 1)
            money = value;
            this.setState({to: value})
          } else if (event.target.value.length < this.state.to.length) {
            this.selectionStartTo = this.ref2.selectionStart
            this.selectionEndTo = this.ref2.selectionEnd
            if (event.target.value.replace(/[^0-9]/g, "").length % 3 == 0 && this.ref2.selectionStart !=0) {
              this.selectionStartTo = this.ref2.selectionStart - 1
              this.selectionEndTo = this.ref2.selectionEnd - 1
            }
            money = value;
            setTimeout(() => this.setState({to: value}), 10)
          } else {
            this.selectionStartTo = this.ref2.selectionStart - 1
            this.selectionEndTo = this.ref2.selectionEnd - 1
            money = this.state.to !== "0" ? this.state.to : value;
            this.setState({to: money})
          }
        }
      } else {
        money = "";
        if (field === "from") {
          this.setState({from: ""})
        } else {
          this.setState({to: ""})
        }
      }
      if (field === "from") {
        this.props.onChanged(money.replace(/\D/g, ""), this.state.to.replace(/\D/g, ""))
      } else {
        this.props.onChanged(this.state.from.replace(/\D/g, ""), money.replace(/\D/g, ""))
      }
  }

  render() {
    const validationState = this.props.validationState || this.state.validationState

    return (
      <FormGroup validationState={validationState} className="nm" bsSize={this.props.bsSize}>
        <div className="number-input-design">
          {/*<CleanableInput mask={this.state.numberMask}*/}
            {/*className={`dpilb w100p ${this.props.formControlClass || ''}`}*/}
            {/*placeholder={this.props.placeholder}*/}
            {/*type="text"*/}
            {/*min={this.props.min} max={this.props.max}*/}
            {/*value={this.state.from || ''}*/}
            {/*onChange={value => this.handleInputChanged("from", value)}*/}
            {/*onEnter={this.props.onEnter}*/}
          {/*/>*/}
          <div className='number-input w100p'>
            <FormControl
              type='tel'
              props={{...this.props}}
              className="dpilb w100p input-text"
              placeholder={this.props.placeholder}
              // value={this.state.from ? parseInt(_.get(this.state,'from','')).toLocaleString(): _.get(this.state,'from','')}
              value={this.state.from}
              onChange={e => this.handleInputChanged("from", e)}
              inputRef={ref => {
                this.ref1 = ref
              }}
              onFocus={() => {
                this.setState({isFocusFrom: true})
              }}
              onBlur={() => {
                this.setState({isFocusFrom: false})
              }}
          />
          {/*<input type='tel '/>*/}
          {
            this.state.from !== "" && <div className="icon1">
              <Glyphicon glyph="remove" onClick={() => this.handlerClearInputData("from")} />
            </div>
          }
          </div>
          {this.props.unit && (
            <div className="cell-tb pdl5 w12p" >{this.props.unit} ～ </div>
          )}
          {!this.props.unit && (<div className="cell-tb pdr5" >～</div>)}
          {/*<CleanableInput mask={this.state.numberMask}*/}
            {/*className={`dpilb w100p ${this.props.formControlClass || ''}`}*/}
            {/*placeholder={this.props.placeholder}*/}
            {/*type="text"*/}
            {/*min={this.state.from || 0} max={this.props.max}*/}
            {/*value={this.state.to || ''}*/}
            {/*onChange={value => this.handleInputChanged("to", value)}*/}
            {/*onEnter={this.props.onEnter}*/}
          {/*/>*/}
          <div className='number-input'>
          <FormControl
            type='tel'
            props={{...this.props}}
            className="dpilb w100p input-text"
            placeholder={this.props.placeholder}
            // value={this.state.to ? parseInt(_.get(this.state,'to','')).toLocaleString(): _.get(this.state,'to','')}
            value={this.state.to}
            onChange={e => this.handleInputChanged("to", e)}
            inputRef={ref => {
              this.ref2 = ref
            }}
            onFocus={() => {
              this.setState({isFocusTo: true})
            }}
            onBlur={() => {
              this.setState({isFocusTo: false})
            }}
          />
          {
            this.state.to !== "" && <div className="icon2">
              <Glyphicon glyph="remove" onClick={() => this.handlerClearInputData("to")} />
            </div>
          }
          </div>
          {this.props.unit && (
            <div className="cell-tb pdl5 w10p pdr5" >{this.props.unit}</div>
          )}
        </div>
        {(validationState === 'error' || validationState === 'warning') && (
          <small className="text-wrap"><ControlLabel>{this.props.message || this.state.message}</ControlLabel></small>
        )}
      </FormGroup>
    )
  }
}

NumberInputRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValues: PropTypes.arrayOf(PropTypes.number),
  validationState: PropTypes.string,
  formControlClass: PropTypes.string,
  formControlStyle: PropTypes.object,
  unit: PropTypes.string,
  placeholder: PropTypes.string,
  onChanged: PropTypes.func,
  message: PropTypes.string,
  validate: PropTypes.bool
}

