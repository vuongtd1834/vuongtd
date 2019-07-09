import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Alert} from 'react-bootstrap'

const ErrorPopup = props => (
  <Modal {...props}>
    <Modal.Body>
      <Alert bsStyle="danger">
        {props.message}
      </Alert>
    </Modal.Body>
    <Modal.Footer className="tac">
      <Button onClick={() => props.onHide()}>閉じる</Button>
    </Modal.Footer>
  </Modal>
)

ErrorPopup.propTypes = {
  message: PropTypes.string
}

export default ErrorPopup
