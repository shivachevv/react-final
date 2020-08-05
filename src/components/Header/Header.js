import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import logo from '../../images/logo.png'
import { UserContext } from '../../UserProvider'
import { auth } from '../../firebase'
import defineLinks from '../../NavLinksProvider'

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
                {defineLinks(user).map(link => {
                    return <Link key={link.path} className={styles.navlinks} to={link.path}>{link.label}</Link>
                })}
                {user ? <a href="" className={styles.navlinks} onClick={logoutUser}>Logout</a> : ''}
            </div>
        </nav>
    );
}

export default Header;