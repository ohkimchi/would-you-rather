import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"

const Nav = (props) => {
    const { authedUser } = props
    const greetingUser = (authedUser === "Logout" || authedUser === null || authedUser === "") ? "" : `Hello, ${authedUser}!`
    const loggingStatus = (authedUser === "Logout" || authedUser === null || authedUser === "") ? "Login" : "Logout"
    const handleOnclick = e => {
        //Todo
    }

    return (
        <nav className='nav'>
            <ul>
                <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
                <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
                <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
                <li>{greetingUser}</li>
                <li><NavLink to='/login' activeClassName='active'><div onClick={handleOnclick}>{loggingStatus}</div></NavLink></li>
            </ul>
        </nav>
    )
}

function mapStateToProps({ authedUser }) {
    return { authedUser }
}

export default connect(mapStateToProps)(Nav)
