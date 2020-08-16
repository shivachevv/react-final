import React, { useState, useEffect } from 'react';
import ChangeRndBtn from '../ChangeRndBtn/ChangeRndBtn';
import styles from './teamfield.module.scss'
import getPlayersStats from '../../utils/getPlayersStats'
import { getRounds } from '../../utils/getRounds'
import Popup from '../../components/Popup/Popup'
import Temmate from '../../components/Temmate/Temmate'
import Loading from '../../components/Loading/Loading'


function TeamField({ teamsPerRnd }) {
    const [roundCounter, setRoundCounter] = useState(1)
    const [allPlayers, setAllPlayers] = useState(null)
    const [roundsCount, setRoundsCount] = useState(null)
    const [popupData, setPopupData] = useState(null)
    const [popupActive, setPopupActive] = useState(false)

    useEffect(() => {
        getPlayersStats().then(data => {
            setAllPlayers(data)
        })
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
                    .split('-').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join('-')
    }

    const popupHandler = (x) => {
        const player = teamsPerRnd[`r${roundCounter}`][x]
        const { name, pos, shirt, rounds, team } = allPlayers[makeNameEqual(player)]
        const playerPts = rounds[roundCounter] ? rounds[roundCounter].pts : ''

        setPopupData({
            name,
            pos,
            shirt,
            rounds,
            team
        })
        setPopupActive(true)
    }

    const closePopup = () => {
        return setPopupActive(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <ChangeRndBtn title="Previous Round" onClick={changeRnd} rnd={roundCounter} />
                <span className="up">Round: {roundCounter} of {roundsCount}</span>
                <ChangeRndBtn title="Next Round" onClick={changeRnd} rnd={roundCounter} />
            </div>
            {allPlayers ?
                <div className={styles.field}>
                    {teamsPerRnd[`r${roundCounter}`] ?
                        Object.keys(teamsPerRnd[`r${roundCounter}`]).map(x => {
                            const player = teamsPerRnd[`r${roundCounter}`][x]
                            const { name, pos, shirt, rounds, team } = allPlayers[makeNameEqual(player)]
                            const playerPts = rounds[roundCounter] ? rounds[roundCounter].pts : ''
                            return (
                                <Temmate
                                    className={styles[pos]}
                                    key={x}
                                    player={allPlayers[makeNameEqual(player)]}
                                    playerPts={playerPts}
                                    popupHandler={popupHandler}
                                />)
                        })
                        :
                        <div className={[styles.noteam, "up"].join(' ')}>You have not selected team for<br />round {roundCounter}!</div>
                    }
                </div>
                :
                <Loading />}
            {popupActive ? <Popup
                data={popupData}
                closePopup={closePopup}
            /> : ''}
        </div>
    );
}

export default TeamField;