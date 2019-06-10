import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
  const { authedUser } = props
  const loggingStatus = (authedUser === 'Logout' || authedUser === null || authedUser === "") ? "Log in here!" : `Hello, ${authedUser} :)`;
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
        <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
        <li><NavLink to='/login' activeClassName='active'>{loggingStatus}</NavLink></li>
      </ul>
    </nav>
  )
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(Nav);
