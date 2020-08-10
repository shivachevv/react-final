import React from 'react';
import styles from './teamheader.module.scss'


function TeamHeader({ teamName, teamLogo }) {
    return (
        <div className={styles.container}>
            <h1 className="up">{teamName}</h1>
            <img src={teamLogo} />
        </div>
    );
}

export default TeamHeader;