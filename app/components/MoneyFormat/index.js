import React from 'react'
import {FormControl, FormGroup, ControlLabel, Glyphicon} from 'react-bootstrap'
import CustomSomeMethod from 'components/CustomSomeMethod'
import _ from 'lodash'
import './index.scss'

export default class MoneyFormat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      splitNumber: 1,
      value: !_.isEmpty(`${this.props.value}`) ? CustomSomeMethod.toLocaleString(parseInt(this.props.value, 10)).replace(/\./g, ",") : ""
      // value: !_.isEmpty(`${this.props.value}`) ? parseInt(this.props.value, 10).toLocaleString().replace(/\./g, ",") : ""
    }
  }
  componentDidUpdate() {
    if (this.ref && this.event && this.state.isFocus === true) {
      this.event.preventDefault()
      // if (this.deleteFromSpecial) {
      //   setTimeout(() => {
      //     this.ref.setSelectionRange(this.selectionStart, this.selectionEnd)
      //   }, 10);
      //   this.deleteFromSpecial = false
      // } else {
      this.ref.setSelectionRange(this.selectionStart, this.selectionEnd)
    }
    this.state.isFocus = false
    // }
  }

  // handlerIndexForcus() {
  //   if (this.state.value.split(',').length === this.state.splitNumber) {
  //     return this.indexForcus
  //   }
  //   const numberIndexAfter = this.state.value.split(',').length - this.state.splitNumber
  //   this.state.splitNumber = this.state.value.split(',').length
  //   return (this.indexForcus + numberIndexAfter);
  // }

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

  handlerFieldChange(event) {
    let value = this.convertValue(event.target.value)
    this.event = event
    let money = "";
    this.state.isFocus = true
    if (value !== "" && value.match(/[0-9]/g) !== null) {
      // value = `${Number(value.replace(/[^0-9]/g, "")).toLocaleString()}`.replace(/[\.]/g, ",")
      value = `${CustomSomeMethod.toLocaleString(Number(value.replace(/[^0-9]/g, "")))}`.replace(/[\.]/g, ",")
      if (value.replace(/[^0-9]/g, "").length <= this.props.numberOfLimit
        && value.length > this.state.value.length && new Date().getTime() - this.state.currentTime > 100) {
        this.state.currentTime = new Date().getTime()
        this.selectionStart = this.ref.selectionStart + (value.length - this.state.value.length - 1)
        this.selectionEnd = this.ref.selectionEnd + (value.length - this.state.value.length - 1)
        money = value;
        this.state.value = money
        // this.setState({value: value})
      } else if (event.target.value.length < this.state.value.length) {
        if (this.state.value.length - value.length === 2 && this.ref.selectionStart !== 0) {
          this.selectionStart = this.ref.selectionStart - 1
          this.selectionEnd = this.ref.selectionEnd - 1
          this.deleteFromSpecial = true
        } else {
          this.selectionStart = this.ref.selectionStart
          this.selectionEnd = this.ref.selectionEnd
        }
        money = value;
        this.state.value = money
        // this.setState({value: value})
      } else {
        if (value.length > this.state.value.length) {
          this.selectionStart = this.ref.selectionStart - 1
          this.selectionEnd = this.ref.selectionEnd - 1
        } else {
          this.selectionStart = this.ref.selectionStart
          this.selectionEnd = this.ref.selectionEnd
        }
        money = this.state.value !== "0" ? this.state.value : value;
        this.state.value = money
        // this.setState({value: money})
      }
    } else {
      money = "";
      this.setState({value: ""})
    }
    this.props.onChange(money.replace(/[^0-9]/g, ""))
    // if (new Date().getTime() - this.state.currentTime > 100) {
    //   this.state.currentTime = new Date().getTime()
    //   if (value === "") {
    //     this.props.onChange("")
    //     this.state.value = ""
    //   } else if (!new RegExp(/[^0-9,]+/).test(value) && this.isPropsCondition(value)) {
    //     this.state.value = parseInt(value.replace(/[^0-9]/g, ""), 10).toLocaleString().replace(/[\.]/g, ",")
    //     this.props.onChange(value.replace(/[^0-9]/g, ''))
    //     this.indexForcus = this.ref.selectionStart;
    //   }
    // }
  }

  // isPropsCondition(value) {
  //   if (_.isNil(this.props.numberOfLimit)) {
  //     return true
  //   }
  //   return value.replace(/[^0-9]/g, '').length <= this.props.numberOfLimit
  // }

  handlerClearInputData() {
    this.setState({value: ""})
    this.props.onChange("")
  }

  render() {
    return <div className="money-format">
      <FormGroup validationState={this.props.validationState}>
        <div className={`${this.props.formControlClass} form-input`}
        >
          <FormControl
            type='tel'
            props={{...this.props}}
            className="input-text"
            value={this.state.value}
            onChange={e => this.handlerFieldChange(e)}
            inputRef={ref => {
              this.ref = ref
            }}
          />
          {
            this.state.value !== "" && <div className="icon">
              <Glyphicon glyph="remove" onClick={() => this.handlerClearInputData()} />
            </div>
          }
        </div>
        <div className="unit mgl5">
          {
            !_.isNil(this.props.unit) && <span>{this.props.unit}</span>
          }
        </div>
        {
          !_.isNil(this.props.message) && <small>
            <ControlLabel>{this.props.message}</ControlLabel>
          </small>
        }
      </FormGroup>
    </div>
  }
}
