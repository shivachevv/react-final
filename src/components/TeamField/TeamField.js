import React, { useState, useEffect } from 'react';
import ChangeRndBtn from '../ChangeRndBtn/ChangeRndBtn';
import styles from './teamfield.module.scss'
import getPlayersStats from '../../utils/getPlayersStats'
import { getRounds } from '../../utils/getRounds'

function TeamField({ teamsPerRnd }) {
    const [roundCounter, setRoundCounter] = useState(1)
    const [allPlayers, setAllPlayers] = useState(null)
    const [roundsCount, setRoundsCount] = useState(null)

    useEffect(() => {
        getPlayersStats().then(data => setAllPlayers(data))
    }, [])
    useEffect(() => {
        getRounds().then(data => setRoundsCount(data.rounds.length + 1))
    }, [])

    const changeRnd = (v) => {
        if (v >= 1 && v <= roundsCount) {
            return setRoundCounter(v)
        }
    }

    const makeNameEqual = (v) => {
        return v.toLowerCase().split(' ').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' ').split('.').join('_')
    }
    const beautifyTeam = (v) => {
        return v.split('_').join(' ').toUpperCase()
    }




    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <ChangeRndBtn title="Previous Round" onClick={changeRnd} rnd={roundCounter} />
                <span className="up">Round: {roundCounter} of {roundsCount}</span>
                <ChangeRndBtn title="Next Round" onClick={changeRnd} rnd={roundCounter} />
            </div>
            {allPlayers &&
                <div className={styles.field}>
                    {teamsPerRnd[`r${roundCounter}`] ?
                        Object.keys(teamsPerRnd[`r${roundCounter}`]).map(x => {
                            const player = teamsPerRnd[`r${roundCounter}`][x]
                            const { name, pos, shirt, rounds, team } = allPlayers[makeNameEqual(player)]
                            const playerPts = rounds[roundCounter] ? rounds[roundCounter].pts : ''
                            return (
                                <div key={x} className={[styles.teammate, styles[pos]].join(' ')}>
                                    <img src={`http://ff-legends.com/images/teamkits/${shirt}.png`} />
                                    <div>
                                        <h3 className={styles.pos}>Position: {pos}</h3>
                                        <h3 className={styles.name}>{name} : {rounds[roundCounter] ? playerPts : ''} pts</h3>
                                        <h3 className={styles.team}>{beautifyTeam(team)}</h3>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className={[styles.noteam, "up"].join(' ')}>You have not selected team for<br/>round {roundCounter}!</div>
                    }
                </div>}
        </div>
    );
}

export default TeamField;