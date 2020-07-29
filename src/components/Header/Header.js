import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import logo from '../../images/logo.png'
import { UserContext } from '../../UserProvider'
import { auth } from '../../firebase'


function Header(props) {
    const user = useContext(UserContext)

    const logoutUser = (e) => {
        e.preventDefault()
        auth.signOut()
        console.log('Successful logOUT!');
    }

    return (
        <nav className="sha">
            <Link className={styles.logo} to="/">
                <img src={logo} alt="Logo" />
            </Link>

            <div className={[styles.navigation, styles.up].join(' ')}>
                <Link className={styles.navlinks} to="/">Home</Link>
                <Link className={styles.navlinks} to="/standings">Standings</Link>
                {user ?
                    <Fragment>
                        <Link className={styles.navlinks} to="/myteam/:id">My Team</Link>
                        <a href="" className={styles.navlinks} onClick={logoutUser}>Logout</a>
                    </Fragment>
                    :
                    <Fragment>
                        <Link className={styles.navlinks} to="/login">Login</Link>
                        <Link className={styles.navlinks} to="/register">Register</Link>
                    </Fragment>
                }
            </div>
        </nav>
    );
}

export default Header;