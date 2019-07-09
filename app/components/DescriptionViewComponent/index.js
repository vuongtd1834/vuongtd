import React from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {detect} from "detect-browser"
import _ from 'lodash'
import './style.scss'

export default class DescriptionViewComponent extends React.Component {
  static index = 0;
  constructor(props) {
    super(props)
    this.state = {
      maxLine: this.props.maxLine || 1,
      lineHeight: this.props.lineHeight || 19,
      content: this.props.content.substring(0, this.props.aboutMaxChar || 250) || ""
    }
    this.state.showView = true
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.setScrollWhenFinish && DescriptionViewComponent.index >= this.props.dataLength) {
        this.props.setScrollWhenFinish()
        DescriptionViewComponent.index = 0;
      }
      if (detect().name !== "chrome") {
        DescriptionViewComponent.index++;
        this.handlerShowDotText();
      } else if (this.props.disableCss) {
        DescriptionViewComponent.index++;
        this.handlerShowDotText();
      }
    }, 0);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.callUpdateProps) {
        this.callUpdateProps = false
        if (detect().name !== "chrome") {
          this.handlerShowDotText();
        } else if (this.props.disableCss) {
          this.handlerShowDotText();
        }
        if (this.props.setScrollWhenFinish && DescriptionViewComponent.index >= this.props.dataLength) {
          this.props.setScrollWhenFinish()
          DescriptionViewComponent.index = 0;
        }
      }
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.state.content = nextProps.content
      this.callUpdateProps = true
      this.state.showView = true

    }
  }

  handlerShowDotText() {
    if (this.ref) {
      const contentElement = ReactDOM.findDOMNode(this.ref).getElementsByClassName("element-content")[0];
      contentElement.textContent = this.state.content
      if (contentElement && this.handlerCompareHeightElement(contentElement, ">")) {
        if (this.props.handlerOverText) {
          this.props.handlerOverText();
        }
        this.handlerConcatTextForView(contentElement);
      }
    }
  }

  handlerConcatTextForView(contentElement) {
    const indexConcatContent = Math.floor(this.state.content.length - this.state.content.length / 3);
    let previewIndex = this.state.content.length;
    for (let i = indexConcatContent; i > 0; i -= (Math.floor(i / 3) > 0 ? Math.floor(i / 3) : 1)) {
      contentElement.textContent = this.state.content.substring(0, i);
      if (this.handlerCompareHeightElement(contentElement, "<")) {
        contentElement.textContent = this.state.content.substring(0, previewIndex);
        previewIndex = this.optimizeIndexFindSuccess(contentElement, previewIndex)
        this.handlerSuccessFindIndexText(contentElement, previewIndex);
        break;
      }
      previewIndex = i;
    }
  }

  optimizeIndexFindSuccess(contentElement, peviewIndex) {
    contentElement.textContent = this.state.content.substring(0, peviewIndex - 8);
    if (this.handlerCompareHeightElement(contentElement, ">")) {
      return this.optimizeIndexFindSuccess(contentElement, peviewIndex - 8)
    }
    return peviewIndex;
  }

  handlerSuccessFindIndexText(contentElement, previewIndex) {
    contentElement.textContent = `${this.state.content.substring(0, previewIndex)}...`
    for (let i = previewIndex; i > 0; i--) {
      if (this.handlerCompareHeightElement(contentElement, "<")) {
        break;
      } else {
        contentElement.textContent = `${this.state.content.substring(0, i)}...`
      }
    }
  }

  handlerCompareHeightElement(el, condition) {
    if (condition === "<" && el.offsetHeight - (this.state.lineHeight / 4) < (this.state.maxLine * this.state.lineHeight)) {
      return true;
    } else if (condition === ">" && (el.offsetHeight - this.state.lineHeight / 4) > (this.state.lineHeight * this.state.maxLine)) {
      return true;
    }
    return false
  }

  render() {
    const cloneProps = {...this.props}
    if (_.isArray(this.props.ignorePropsFields)) {
      this.props.ignorePropsFields.forEach(item => {
        delete cloneProps[item]
      })
    }
    delete cloneProps.ignorePropsFields
    if (detect().name === "chrome" && !this.props.disableCss) {
      return <div
        {...cloneProps}
        style={{
          maxHeight: `${this.state.lineHeight * this.state.maxLine}px`,
          WebkitLineClamp: this.state.maxLine,
          lineHeight: `${this.state.lineHeight}px`,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{this.state.content}</div>
    }
    return (
      <div {...cloneProps} style={{lineHeight: `${this.state.lineHeight}px`, maxHeight: `${this.state.lineHeight * this.state.maxLine}px`}} >

        <div ref={ref => this.ref = ref} className="text-wrap" style={{position: "relative"}}>
          <span className="element-content">
            {/* {this.state.content} */}
          </span>
          {/* {this.state.showView && <span className="show-view">...</span>} */}
        </div>
      </div>
    )
  }
}

DescriptionViewComponent.PropTypes = {
  handlerOverText: PropTypes.func,
  maxline: PropTypes.number,
  content: PropTypes.string,
  ignorePropsFields: PropTypes.array,
  lineHeight: PropTypes.number,
  disableCss: PropTypes.bool,
  aboutMaxChar: PropTypes.number
}
