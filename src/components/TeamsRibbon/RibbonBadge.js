import React from 'react';
import { Link } from 'react-router-dom'
import styles from './ribbonbadge.module.scss'


function RibbonBadge({path, logo}) {
    return (
        <Link className={styles.link} to={`/team-details/${path}`}>
            <img src={logo} alt="Team logo"></img>
        </Link>
    );
}

export default RibbonBadge;