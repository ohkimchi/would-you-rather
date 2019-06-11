import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Leaderboard from "./Leaderboard";
import Homepage from "./Homepage";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Nav from "./Nav";
import Login from "./Login";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleRelogin = this.handleRelogin.bind(this);
        this.state = {
            relogin: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    handleRelogin = () => {
        this.setState({ relogin: !this.state.relogin });
    };

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
                                <Route path='/question/:id' component={QuestionPage} />
                                <Route path='/new' component={NewQuestion} />
                                <Route path='/login' render={(props) => <Login {...props} onClick={this.handleRelogin} relogin={this.state.relogin} />} />
                            </div>}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps ({ authedUser }) {
    return { loading: authedUser === null };
}

export default connect(mapStateToProps)(App);
