import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import LoadingBar from "react-redux-loading"
import Leaderboard from "./Leaderboard"
import Homepage from "./Homepage"
import QuestionPage from "./QuestionPage"
import NewQuestion from "./NewQuestion"
import Nav from "./Nav"
import Login from "./Login"

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { relogin } = this.props
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
                                <Route path='/question/:id' component={QuestionPage} />
                                <Route path='/new' component={NewQuestion} />
                                <Route path='/login' render={(props) => <Login {...props} relogin={relogin} />} />
                            </div>}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps ({ authedUser, relogin }) {
    return { loading: authedUser === null, relogin }
}

export default connect(mapStateToProps)(App)
