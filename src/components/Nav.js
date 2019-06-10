import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
  const { authedUser } = props
  console.log("authedUser", authedUser)
  const loggingStatus = (authedUser === 'Logout' || authedUser === null || authedUser === "") ? "You are logged out." : "Logged in user: " + authedUser;
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
        <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
        <li><NavLink to='/login' activeClassName='active'>Log In(Out)</NavLink></li>
        <li><span>{loggingStatus}</span></li>
      </ul>
    </nav>
  )
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(Nav);
