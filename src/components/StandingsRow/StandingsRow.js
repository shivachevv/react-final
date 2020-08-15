import React from 'react';
import { Link } from 'react-router-dom'
import styles from './standingsrow.module.scss'

const StandingsRow = ({ data, index }) => {

    const makeTeamNameLink = (v) => {
        return `/team-details/${v.toLowerCase().split(' ').join('-')}`
    }


    return (
        <Link to={makeTeamNameLink(data[0])} key={data[0]} className={styles.teamrow}>
            <span className={styles.place}>{index + 1}.</span>

            <div className={styles.team}>
                <img src={data[1].teamLogo} alt="Team Logo" />
                <div>{data[0]}</div>
            </div>
            <span className={styles.pts}>{data[1].total} pts</span>
        </Link>
    );
};

export default StandingsRow;