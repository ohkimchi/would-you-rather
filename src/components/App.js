import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as SharedActions from "../actions/shared"
import LoadingBar from "react-redux-loading"
import LeaderBoard from "./LeaderBoard"
import Homepage from "./Homepage"
import QuestionPage from "./QuestionPage"
import NewQuestion from "./NewQuestion"
import Nav from "./Nav"
import Login from "./Login"
import { bindActionCreators } from "redux"

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Homepage} />
                <Route path="/leaderBoard" component={LeaderBoard} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/login" component={Login} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return { loading: authedUser === null }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SharedActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
