import React from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import logo from '../../images/logo.png'

function Header(props) {
    return (
        <nav className="sha">
            <Link className={styles.logo} to="/">
                <img src={logo} alt="Logo" />
            </Link>

            <div className={[styles.navigation, styles.up].join(' ')}>
                <Link className={styles.navlinks} to="/">Home</Link>
                <Link className={styles.navlinks} to="/login">Login</Link>
                <Link className={styles.navlinks} to="/register">Register</Link>
                <Link className={styles.navlinks} to="/myteam/:id">My Team</Link>
                <Link className={styles.navlinks} to="/standings">Standings</Link>
                <Link className={styles.navlinks} to="/logout">Logout</Link>
            </div>
        </nav>
    );
}

export default Header;