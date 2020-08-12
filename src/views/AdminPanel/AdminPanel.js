import React, { useEffect, useState } from 'react';
import styles from './adminpanel.module.scss'
import getAllPlayersPts from '../../utils/getAllPlayersPts'
import { getRounds, addRound } from '../../utils/getRounds'
import Badge from '../../components/Badge/Badge'
import Loading from '../../components/Loading/Loading'
import changePageTitle from '../../utils/changePageTitle'


const API_POINTS_URL = 'https://softuni-react-final.firebaseio.com/allPlayersPts'

function AdminPanel(props) {

    const [teamSelected, setTeamSelected] = useState('afc_bournemouth')
    const [players, setPlayers] = useState(null)
    const [updatePlayersFlag, setUpdatePlayersFlag] = useState(false)
    const [rounds, setRounds] = useState(null)

    useEffect(() => {
        changePageTitle("Admin Panel")
        getAllPlayersPts().then(data => setPlayers(data)).catch(e => console.log(e))
    }, [players, updatePlayersFlag])
    useEffect(() => {
        getRounds().then(data => setRounds(data.rounds)).catch(e => console.log(e))
    }, [rounds])

    const roundHandler = {
        add: () => {
            rounds.push(rounds.length + 1)
            return addRound({ rounds })
        },
        remove: () => {
            rounds.pop()
            return addRound({ rounds })
        }
    }

    const ptsSubmitHandler = e => {
        e.preventDefault()

        const URL = e.currentTarget.ptsInput.dataset.path
        const payload = {
            "pts": e.currentTarget.ptsInput.value
        }

        fetch(URL, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(res => res.json()).then(() => setUpdatePlayersFlag(!updatePlayersFlag)).catch(e => console.log(e))

    }
    const makePath = (team, pos, player, rnd) => {
        const playerFixed = player.split(' ').join('%20')
        return `${API_POINTS_URL}/${team}/${pos}/${playerFixed}/rounds/${rnd}.json`
    }

    const renderPointsForm = (rnd, isRounds, arePts, teamToShow, team, pos, player) => {
        return (
            <form key={rnd} onSubmit={ptsSubmitHandler}>
                <label>{rnd}
                    {isRounds && arePts ?
                        <input type="text" defaultValue={teamToShow[pos][player]['rounds'][rnd]['pts']}
                            className={styles.withvalue}
                            name="ptsInput"
                            data-path={makePath(team, pos, player, rnd)} />
                        :
                        <input className={styles.empty}
                            type="text" defaultValue=""
                            name="ptsInput"
                            data-path={makePath(team, pos, player, rnd)} />
                    }
                </label>
                <button type="submit">Upload</button>
            </form>
        )
    }

    const selectTeam = e => {
        e.preventDefault()
        const team = e.currentTarget.dataset.team
        setTeamSelected(team)
    }

    const prettyName = (v) => {
        return v.split('_').join('.')
    }
    
    if (players && rounds) {
        const teamToShow = players[teamSelected]

        return (
            <div className={styles.container}>
                <div className={styles.roundcommand}>
                    <h1>Total Rounds: {rounds.length}</h1>
                    <div>
                        <button onClick={roundHandler.remove}>Remove Round</button>
                        <button onClick={roundHandler.add}>Add next Round</button>
                    </div>
                </div>
                <div className={styles.selectclub}>
                    <h1>Select a club!</h1>
                    <div>
                        {Object.keys(players).map(team => {
                            return <Badge name={team} onClick={selectTeam} key={team} selected={teamSelected} />
                        })}
                    </div>
                </div>
                <div className={styles.clubdetails}>
                    <h1 className="up">Club: {teamSelected}</h1>
                    <div className={styles.positions}>
                        {Object.keys(teamToShow).map(pos => {
                            return (
                                <div className={styles.position} key={pos}>
                                    <h1 className="up">Position: {pos}</h1>
                                    <div className={styles.names}>
                                        {Object.keys(teamToShow[pos]).map(player => {
                                            return (
                                                <div className={styles.name} key={player}>
                                                    <h3>Name: {prettyName(player)}</h3>
                                                    <div className={styles.points}>
                                                        {
                                                            rounds.map(rnd => {
                                                                const isRounds = teamToShow[pos][player]['rounds']
                                                                const arePts = isRounds ? teamToShow[pos][player]['rounds'][rnd] : null
                                                                return renderPointsForm(rnd, isRounds, arePts, teamToShow, teamSelected, pos, player)
                                                            })
                                                        }
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Loading />
        )
    }

}

export default AdminPanel



