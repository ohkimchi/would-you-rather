import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/' exact activeClassName='active'>Homepage</NavLink></li>
        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
        <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
      </ul>
    </nav>
  )
}
