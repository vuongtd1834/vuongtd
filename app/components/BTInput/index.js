import React from 'react'
import PropTypes from 'prop-types'
import {FormControl} from 'react-bootstrap'
import MaskedInput from 'react-text-mask'


const BTInput = props => {
  const onKeyPress = e => {
    if (e.key === 'Enter' && props.onEnter) {
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      e.preventDefault()
      props.onEnter()
    }
  }

  const maskInputClass = [props.className, "form-control"]

  if (props.bsSize) {
    maskInputClass.push(`input-${props.bsSize}`)
  }

  return props.mask
    ?
    <MaskedInput {...props}
      className={maskInputClass.join(' ')}
      onKeyPress={props.onKeyPress || onKeyPress}
    />
    :
    (
      <FormControl {...props} onKeyPress={props.onKeyPress || onKeyPress} />
    )
}

BTInput.propTypes = {
  onEnter: PropTypes.func
}

export default BTInput

