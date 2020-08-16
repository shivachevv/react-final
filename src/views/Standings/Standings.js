import React, { useState, useEffect } from 'react';
import styles from './standings.module.scss'
import Loading from '../../components/Loading/Loading'
import getStandings from '../../utils/getStandings'
import { getRounds } from '../../utils/getRounds'
import changePageTitle from '../../utils/changePageTitle'
import StandingsRow from '../../components/StandingsRow/StandingsRow'

function Standings(props) {

    const [standings, setStandings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [rounds, setRounds] = useState(0)


    useEffect(() => {
        changePageTitle("Standings")
        const getData = async () => {
            const rounds = await getRounds()
            const roundsCount = Object.keys(rounds.rounds).length
            const result = await getStandings(roundsCount)
            setStandings(result)
            setLoading(false)
        }
        getData()
    }, [])

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
                            <StandingsRow data={x} index={i} key={i}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Standings;