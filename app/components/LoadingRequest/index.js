import React from 'react'
import {APILoading} from 'components/LoadingIndicator'
import './styles.scss'

export default class LoadingRequest extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="loading-request" >
        <center className="loading-middle"><APILoading />
          <strong>{this.props.loadingDescription && this.props.loadingDescription}</strong>
        </center>
      </div>
    )
  }
}
