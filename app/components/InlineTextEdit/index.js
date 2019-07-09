import ReactDOM from 'react-dom'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {Button} from 'react-bootstrap'
import CleanableInput from '../CleanableInput'

import './styles'

export default class InlineTextEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      value: props.value
    }

    this.onDivClick = this._onDivClick.bind(this)
    this.onSave = this._onSave.bind(this)
    this.handleChange = this._handleChange.bind(this)
    // this.handleKeyPress = this._handleKeyPress.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handBlur = this._handBlur.bind(this)
    this.handClickText = this.handClickText.bind(this)
  }

  static propTypes = {
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    editable: PropTypes.bool.isRequired
  }

  static defaultProps = {
    editable: true,
    placeholder: '入力してください'
  }

  componentWillMount() {
    this.setState({
      value: this.props.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isNil(nextProps.value)) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleOutsideClick, false)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  _onDivClick() {
    if (this.props.editable) {
      this.setState({editMode: true})
      if (this.props.onEdit) {
        this.props.onEdit()
      }
    }
  }

  handClickText() {
    if (!this.state.editMode) {
      if (this.props.onClickText) {
        this.props.onClickText()
      }
    }
  }

  handleOutsideClick(e) {
    if (ReactDOM.findDOMNode(this.node).parentNode.contains(e.target)) {
      return
    }
    if (this.props.handleOutsideClickCallback) {
      this.props.handleOutsideClickCallback(e)
    }
    this.setState({editMode: false})
    if (this.props.onView) {
      this.props.onView()
    }
  }

  _onSave() {
    if (this.props.onSave) {
      this.props.onSave(this.state.value)
    }
    this.setState({editMode: false})
    if (this.props.onView) {
      this.props.onView()
    }
  }

  _handleChange(value) {
    this.setState({value: value})
  }

  // _handleKeyPress(e) {
  //   if (e.key === 'Enter') {
  //     this._onSave()
  //   }
  // }
  _handBlur(e) {
    console.log(e.target)
  }

  moveCaretAtEnd(e) {
    const temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    const _styleClass = [this.props.className]
    const {editMode} = this.state
    if (editMode || this.props.modeMemoFocus) {
      _styleClass.push('editable')
    } else if (!this.state.value) {
      _styleClass.push('text-muted')
    }
    _styleClass.push(`inline-text-edit ${this.props.componentClass === "textarea" ? "txt-area" : "normal"}`)

    const _buttonStyle = {}

    if (this.props.componentClass !== "textarea") {
      _buttonStyle.top = 0
    } else {
      _buttonStyle.bottom = 0
    }
    const editModeFunc = () => {
      if (editMode || this.props.modeMemoFocus) {
        return <CleanableInput {...this.props}
                               className={`${this.props.componentClass === "textarea" ? "editable-textarea-field" : "editable-input-field"}  ${this.props.classCustom || ''}`}
                               value={this.state.value}
                               autoFocus
                               onFocus={::this.moveCaretAtEnd}
                               onChange={this.handleChange}
                               onKeyPress={this.handleKeyPress}
                               message={this.props.message}
                               validationState={this.props.validationState}
                               maxlength={3000}
                               messagePosition={this.props.messagePosition}/>
      }
      if (this.state.value) {
        return this.state.value
      }
      return this.props.placeholder
    }

    return (
      <div className={_styleClass.join(' ')} ref={node => {
        this.node = node
      }}>
        <div className="text-wrap" onClick={this.handClickText}>
          {editModeFunc()}
        </div>
        {
          editMode || this.props.modeMemoFocus
            ? <Button id="btn1" bsSize='xs' bsStyle='primary' onClick={this.onSave} style={_buttonStyle}>保存</Button>
            : <Button id="btn2" bsSize='xs' bsStyle='outline-primary' onClick={this.onDivClick} style={_buttonStyle}>編集</Button>
        }
      </div>
    )
  }
}
