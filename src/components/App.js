import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import Leaderboard from './Leaderboard'
import Homepage from './Homepage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Homepage />
        {/*<Leaderboard />*/}
        {/*{this.props.loading === true ? null : <Leaderboard /> }*/}
      </div>
    )
  }
}

export default connect()(App);
