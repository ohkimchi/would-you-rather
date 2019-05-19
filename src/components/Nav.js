import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render() {
    console.log(this.props.authedUser)
     return (
        <nav className='nav'>
          <ul>
            <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
            <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
            <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
            <li><NavLink to='/login' activeClassName='active'>Log In(Out)</NavLink></li>
            <li><span>Logged in user: {this.props.authedUser}</span></li>
          </ul>
        </nav>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(Nav)
