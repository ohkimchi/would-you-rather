import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setAuthedUser } from "../actions/authedUser"
import { setRelogin } from "../actions/relogin"

const Nav = (props) => {
    const { authedUser, relogin } = props
    const greetingUser = (authedUser === "Logout" || authedUser === null || authedUser === "") ? "" : `Hello, ${authedUser}!`
    let loggingStatus = (authedUser === "Logout" || authedUser === null || authedUser === "") ? "Login" : "Logout"
    const handleOnclick = () => {
        loggingStatus = (loggingStatus === "Logout") ? "Login" : "Logout"
        if (loggingStatus === "Logout") {
            props.dispatch(setAuthedUser(null))
            if (relogin === false) {
                props.dispatch(setRelogin(true))
            }
        }
    }

    return (
        <nav className='nav'>
            <ul>
                <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
                <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
                <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
                <li>{greetingUser}</li>
                <li>
                    <NavLink to='/login' activeClassName='active'>
                        <div onClick={handleOnclick}>{loggingStatus}</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )

}

function mapStateToProps({ authedUser, relogin }) {
    return { authedUser, relogin }
}

export default connect(mapStateToProps)(Nav)
