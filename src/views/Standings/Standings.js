import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styles from './standings.module.scss'
import Loading from '../../components/Loading/Loading'
import getStandings from '../../utils/getStandings'

function Standings(props) {

    const [standings, setStandings] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const result = await getStandings(1)
            setStandings(result)
            setLoading(false)
        }
        getData()
    }, [])

    const makeTeamNameLink = (v) => { 
        return `/team-details/${v.toLowerCase().split(' ').join('-')}`
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}>FFL Standings</h1>
                <div className={styles.standingscontainer}>
                    <div className={styles.standingsheader}>
                        <span className={styles.place}>#</span>
                        <span className={styles.team}>Team</span>
                        <span className={styles.pts}>Points</span>
                    </div>
                    {standings.map((x, i) => {
                        return (
                            <Link to={makeTeamNameLink(x[0])} key={x[0]} className={styles.teamrow}>
                                <span className={styles.place}>{i + 1}.</span>

                                <div className={styles.team}>
                                    <img src={x[1].teamLogo} alt="Team Logo" />
                                    <div>{x[0]}</div>
                                </div>
                                <span className={styles.pts}>{x[1].total} pts</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Standings;