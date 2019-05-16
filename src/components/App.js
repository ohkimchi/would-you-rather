import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import Homepage from './Homepage'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Homepage} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/questions/:id' component={Question} />
                  <Route path='/new' component={NewQuestion} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return { loading: authedUser === null }
}

export default connect(mapStateToProps)(App);
