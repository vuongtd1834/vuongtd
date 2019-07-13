import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {goBack, push} from 'connected-react-router'

import './styles'

import NavBar from '../../components/NavBar'
import Test from '../Test'

// Redux
import {connect} from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prevPage: null
    }
  }


  render() {
    const test = (
      <Switch>
        <Route exact path="/home" component={Test} />
      </Switch>
    )


    const getRoute = () => {
      return test
    }

    return (
      <div id='root-container'>
        <NavBar/>
        {getRoute()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  route: url => dispatch(push(url)),
  goBack: url => dispatch(goBack()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
