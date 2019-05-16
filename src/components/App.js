import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import Leaderboard from './Leaderboard'
// import Homepage from './Homepage'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <LoadingBar />
        {this.props.loading === true ? null : <NewQuestion />}
        {/*{this.props.loading === true ? null : <Homepage />}*/}
        {/*{this.props.loading === true ? null : <Leaderboard /> }*/}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return { loading: authedUser === null }
}

export default connect(mapStateToProps)(App);
