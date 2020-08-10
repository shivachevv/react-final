import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import logo from '../../images/logo.png'
import { UserContext } from '../../UserProvider'
import { auth } from '../../firebase'
import defineLinks from '../../NavLinksProvider'
import getUserTeams from '../../utils/getUserTeams'

function Header(props) {
    const user = useContext(UserContext)
    const [loggedId, setLoggedId] = useState(null)
    const [loggedLogo, setLoggedLogo] = useState(null)

    useEffect(() => {
        if (user) {
            getUserTeams().then(data => {
                const [result] = Object.values(data).filter(x => {
                    return x.uid === user.uid
                })
                setLoggedLogo(result.teamLogo)
                setLoggedId(result.teamName.toLowerCase().split(' ').join('-'))
            })
        }
    }, [user])


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
                {defineLinks(user, loggedId, loggedLogo).map(link => {
                    return <div className={styles.navlinks} key={link.path}>
                        <Link  to={link.path}>{link.label}</Link>
                        {link.logo ? <img src={link.logo} alt="logo" /> : ''}
                    </div>
                })}
                {user ? <a href="" className={styles.navlinks} onClick={logoutUser}>Logout</a> : ''}
            </div>
        </nav>
    );
}

export default Header;