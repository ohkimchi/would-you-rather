import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='' exact activeClassName='active'>Homepage</NavLink></li>
        <li><NavLink to='' activeClassName='active'>Leaderboard</NavLink></li>
        <li><NavLink to='' activeClassName='active'>New Question</NavLink></li>
      </ul>
    </nav>
  )
}
