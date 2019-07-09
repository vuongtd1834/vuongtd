import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import LinesEllipsis from 'react-lines-ellipsis'
import _ from 'lodash'

import './styles'

export default class DescriptionView extends Component {

  static propTypes = {
    ellipsis: PropTypes.string,
    openEllipsis: PropTypes.string,
    closeEllipsis: PropTypes.string,
    content: PropTypes.string,
    maxLine: PropTypes.number,
    tooltip: PropTypes.bool,
    tooltipPosition: PropTypes.string,
    allowShowAll: PropTypes.bool,
    wrapText: PropTypes.bool,
  }

  static defaultProps = {
    ellipsis: '...',
    openEllipsis: '全て見る',
    closeEllipsis: '閉じる',
    content: '',
    maxLine: 2,
    tooltip: true,
    tooltipPosition: 'right',
    allowShowAll: false,
    wrapText: true
  }

  constructor(props) {
    super(props)

    this.state = {
      showAll: false
    }

  }

  getTooltipContent() {
    return this.props.content
  }

  render() {

    let elm = (
      <LinesEllipsis
        ellipsis={this.props.ellipsis}
        ref={ref => this.linesEllipsisRef = ref}
        text={this.props.content}
        maxLine={this.state.showAll ? 10000 : this.props.maxLine}
        className={`text-wrap ${this.props.className}`}
        onReflow={({clamped, text}) => {
          if (clamped) {
            const showAllLink = ReactDOM.findDOMNode(this.showAllLinkRef)
            if (showAllLink) {
              showAllLink.style.display = 'block'
            }
          }
        }}
        basedOn='letters'
      />
    )

    if (this.props.tooltip) {
      elm = (
        <OverlayTrigger
          ref={ref => this.overlayTriggerRef = ref}
          placement={this.props.tooltipPosition}
          delayShow={10000}
          onMouseOver={(e) => {
            e.preventDefault()
            if (_.get(this.linesEllipsisRef, 'clamped')) {
              this.overlayTriggerRef.show()
            }
          }}
          onMouseOut={(e) => {
            e.preventDefault()
            if (_.get(this.linesEllipsisRef, 'clamped')) {
              this.overlayTriggerRef.hide()
            }
          }}
          overlay={<Tooltip id="tooltip">{this.getTooltipContent()}</Tooltip> }>
          {elm}
        </OverlayTrigger>
      )
    }

    if (this.props.allowShowAll) {
      elm = (<div className={`ellipsis-html ${this.props.wrapText && 'force-wrap'}`}>
        {elm}
        <a href="#show-all"
          style={{display: 'none'}}
          ref={ref => this.showAllLinkRef = ref}
          onClick={(e) => {
            e.preventDefault()
            this.setState({showAll: !this.state.showAll})
          }}
        >
          {!this.state.showAll ? this.props.openEllipsis : this.props.closeEllipsis}
        </a>
      </div>)
    }
    return elm
  }
}
