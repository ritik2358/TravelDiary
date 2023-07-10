import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

import './NavLinks.css'
// import Auth from '../../../user/pages/Auth'

const NavLinks = props => {
    const auth = useContext(AuthContext)

    return <ul className='nav-links'>
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>

        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}`}>MY PLACES</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/places/new">ADD PLACES</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">AUTHINCATE</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LOGOUT </button>
            </li>
        )}
    </ul>
}

export default NavLinks