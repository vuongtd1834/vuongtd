import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Glyphicon} from 'react-bootstrap'

import './styles.scss'

const BTModal = props => {
  props = {...BTModal.defaultPropTypes, ...props}

  return (
    <Modal {...props} bsSize={props.bsStyleBtn === "primary" ? "small" : ""} className={`bt-modal ${props.className}`}>
      <Modal.Body>
        <div className="pd10" styles={{minHeight: 100}}>
          {props.icon ? (
            <div>
              {props.icon}
              <span className="title textbold mgl10 text-wrap">{props.title}</span>
            </div>
          ) : (
              <div>
                <span className="title textbold text-wrap">{props.title}</span>
              </div>
            )}

          <div className={`content ${props.icon ? 'mgl30' : 'mgl10'}`}>{props.content}</div>
        </div>
        <div className="tar">
          {props.showOk && (
            <Button bsStyle={props.bsStyleBtn} className="mgr10 btn-ok" onClick={() => (props.onOk && props.onOk())}>{props.okText || 'Ok'}</Button>
          )}
          {props.showCancel && (
            <Button bsStyle="reset" className="mgr10 btn-cancel" onClick={() => (props.onCancel && props.onCancel())}>{props.cancelText || 'Cancel'}</Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

BTModal.ErrorIcon = (
  <Glyphicon glyph="remove-circle" className="icon-error" />
)

BTModal.WarningIcon = (
  <Glyphicon glyph="warning-sign" className="icon-warning" />
)

BTModal.SuccessIcon = (
  <Glyphicon glyph="ok-circle" className="icon-success" />
)

BTModal.defaultPropTypes = {
  showOk: true,
  showCancel: true
}

BTModal.propTypes = {
  showOk: PropTypes.bool,
  showCancel: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  icon: PropTypes.elemelt,
  title: PropTypes.title,
  content: PropTypes.content
}

export default BTModal
