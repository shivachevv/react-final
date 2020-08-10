import React, { useState, useEffect } from 'react';
import ChangeRndBtn from '../ChangeRndBtn/ChangeRndBtn';
import styles from './teamfield.module.scss'
import getPlayersStats from '../../utils/getPlayersStats'

function TeamField({ rounds }) {
    const [roundCounter, setRoundCounter] = useState(1)
    const [allPlayers, setAllPlayers] = useState(null)

    useEffect(() => {
        getPlayersStats().then(data => setAllPlayers(data))
    }, [])

    const changeRnd = (v) => {
        return setRoundCounter(v)
    }
    const makeNameEqual = (v) => {
        return v.toLowerCase().split(' ').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' ')
    }
    const beautifyTeam = (v) => {
        return v.split('_').join(' ').toUpperCase()
    }




    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <ChangeRndBtn title="Previous Round" onClick={changeRnd} rnd={roundCounter} />
                <ChangeRndBtn title="Next Round" onClick={changeRnd} rnd={roundCounter} />
            </div>
            {allPlayers &&
                <div className={styles.field}>
                    {
                        Object.keys(rounds[`r${roundCounter}`]).map(x => {
                            const player = rounds[`r${roundCounter}`][x]
                            const { name, pos, shirt, total, team } = allPlayers[makeNameEqual(player)]
                            return (
                                <div key={x} className={[styles.teammate, styles[pos]].join(' ')}>
                                    <img src={`http://ff-legends.com/images/teamkits/${shirt}.png`} />
                                    <div>
                                        <h3 className={styles.pos}>Position: {pos}</h3>
                                        <h3 className={styles.name}>{name} : {total}pts</h3>
                                        <h3 className={styles.team}>{beautifyTeam(team)}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>}
        </div>
    );
}

export default TeamField;