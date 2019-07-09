import React, {Component} from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import DescriptionViewComponent from './../DescriptionViewComponent';
import './styles'
import PropTypes from 'prop-types'
// import Clamp from "./Clamp";
export default class ClampDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withToolTip: false,
    };
  }
  onClampStart = () => {
    if (!this.state.withToolTip) {
      this.setState({
        withToolTip: true,
      });
      return false;
    }
  }
  componentWillReceiveProps(nextProps) {
    this.state.withToolTip = false
  }
  render() {
    const clamp = <DescriptionViewComponent
      ignorePropsFields={['content']}
      disableCss={this.props.tooltip}
      handlerOverText={() => this.onClampStart()}
      maxLine={this.props.maxLine}
      content={this.props.content}
      aboutMaxChar={400}
      dataLength={this.props.dataLength}
      setScrollWhenFinish={() => this.props.setScrollWhenFinish()}
    />

    // if (this.state.withToolTip && this.props.tooltip) {
    return <Tooltip
      placement={this.props.tooltipPosition}
      overlay={<div className='tooltip-description'>{this.props.content}</div>}
      // visible={this.state.withToolTip}
      onVisibleChange = {() => {
        if(this.state.withToolTip) {
          this.setState({
            visibleTooltip: !this.state.visibleTooltip
          })
        }
      }}
      visible={this.state.visibleTooltip}
      trigger={['hover']}
    >{clamp}</Tooltip>;
    // }
    // return clamp;
  }
}

ClampDescription.PropTypes = {
  maxline: PropTypes.number,
  content: PropTypes.string,
  tooltip: PropTypes.bool,
  tooltipPosition: PropTypes.string
}
