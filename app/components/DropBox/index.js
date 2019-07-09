import React, {Component} from 'react'
import { List, AutoSizer} from 'react-virtualized'
import './styles.scss'
import ReactDOM from "react-dom";
import {Glyphicon} from 'react-bootstrap'
export default class DropBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOptinos : 'none',
      width: 500,
      height: 500,
      hideScroll: false
    }
    this.sizeDropBox = {
      defaulttHeight: 500,
      defaultWidth: 500
    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.handleClickDropValue = this.handleClickDropValue.bind(this)
    this.toggleShowOptions = this.toggleShowOptions.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.calMaxHeight = this.calMaxHeight.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.options && nextProps.options !== this.props.options){
      const maxWidth = this.calMaxHeight(nextProps.options)
      if(nextProps.options.length <20){
        this.setState({
          height: nextProps.options.length * 25,
          width: maxWidth,
          hideScroll: true
        })
      } else {
        this.setState({
          height: this.sizeDropBox.defaulttHeight,
          width: maxWidth,
          hideScroll: false
        })
      }
    }
  }

  calMaxHeight(list){
    let max = 0
    list.forEach(value => {
      let widthTmp
      if(new RegExp(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g).test(value.label)) {
        widthTmp = value.label.length * 12
      } else {
        widthTmp = value.label.length * 8
      }
      if(widthTmp > max){
        max = widthTmp
      }
    })
    return max
  }

  onChangeValue(value) {
    this.props.onChange(value)
    this.toggleShowOptions()
  }
  handleClickDropValue(){
    this.toggleShowOptions()
  }

  toggleShowOptions(){
    if(this.state.showOptinos === 'none'){
      this.setState({
        showOptinos : ''
      })
    } else {
      this.setState({
        showOptinos : 'none'
      })
    }
  }

  componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false)
  }

  handleOutsideClick(e) {
    if (ReactDOM.findDOMNode(this.node).parentNode.contains(e.target)) {
      return
    }
    this.setState({showOptinos : 'none'})
  }
  render() {
    const options = this.props.options
    const heightHandle = this.state.height
    const widthHandle = this.state.width
    return (
      <div className='dropbox-main' ref={node => {
        this.node = node
      }}>
        <div onClick={() => this.handleClickDropValue()} className='dropbox-select-value'>
          <div style={{
            width: '92%',
            display: 'inline-block',
            float: 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
          {this.props.value.label}
          </div>
          <Glyphicon
            className='dropbox-icon'
            glyph={this.state.showOptinos === 'none' ? 'chevron-up' : 'chevron-down'}
          />
          </div>
        {/*{*/}
          {/*console.log('_.get(this.props, \'options\', []).length', _.get(this.props, 'options', []).length)*/}
        {/*}*/}
        {_.get(this.props, 'options', []).length !== 0 && <div className='dropbox-list-options'>
          <AutoSizer disableHeight>
            {({width}) => (
              <List
                autoHeight={this.state.hideScroll}
                className='dropbox-options'
                style={{display: this.state.showOptinos}}
                height={heightHandle}
                width={widthHandle < width ? width : widthHandle}
                overscanRowCount={10}
                rowHeight={25}
                rowCount={this.props.options.length}
                rowRenderer={({index, isScrolling, key, style, parent}) => {
                  return (
                    <div onClick={() => this.onChangeValue(options[index])} className="dropbox-option" style={{
                      ...style,
                      width: widthHandle < width ? width : widthHandle
                    }}>{options[index].label}</div>
                  )
                }}
              />
            )}
          </AutoSizer>
        </div>
        }
      </div>
    )
  }
}
