import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../UserProvider'
import Input from '../../components/Input/Input'
import Badge from '../../components/Badge/Badge'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn'
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg'
import Loading from '../../components/Loading/Loading'
import getUserTeams from '../../utils/getUserTeams'
import getAllPlayers from '../../utils/getAllPlayers'
import { getRounds } from '../../utils/getRounds'
import changePageTitle from '../../utils/changePageTitle'

import styles from './editteam.module.scss'

class EditTeam extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            currentUserTeam: '',
            rounds: '',
            user: null,
            players: '',
            chosenClub: '',
            userTeam: {},
            positionLayout: ['gk', 'dl', 'dc', 'dr', 'ml', 'mc', 'mr', 'st'],
            teamName: '',
            teamLogo: '',
            errors: {
                teamName: false,
                teamUniqueName: false,
                teamLogo: false,
            },
            badgeSelected: ''
        }
    }


    componentDidMount() {
        changePageTitle("Edit Team")
        getAllPlayers().then(data => this.setState({ players: data.data }))

        getUserTeams().then(data => {
            const [result] = Object.values(data).filter(x => {
                if (x.teamName) {
                    return x.teamName.split(' ').join('-').toLowerCase() === this.state.id
                }
            })
            this.setState({ currentUserTeam: result })
            this.setState({ teamName: result.teamName })
            this.setState({ teamLogo: result.teamLogo })
            this.setState({ user: this.context })
        })

        getRounds().then(data => this.setState({ rounds: data.rounds }))
    }

    selectClub = (e) => {
        e.preventDefault()
        const chosenClubName = e.currentTarget.dataset.team
        this.setState({
            badgeSelected: chosenClubName
        })
        const [team] = this.state.players.filter(x => {
            const teamName = Object.keys(x)[0]
            return chosenClubName === teamName ? x : null
        })
        this.setState({
            chosenClub: team
        })
    }

    addPlayerToTeam = (e) => {
        e.preventDefault()
        const playerName = e.currentTarget.innerText
        const position = e.currentTarget.dataset.position
        const userTeam = this.state.userTeam
        userTeam[position] = playerName
        this.setState({
            userTeam
        })
        // this.updateIsTeamFull()
    }

    isThereUserTeam = () => {
        return Object.keys(this.state.userTeam).length ? true : false
    }

    updateIsTeamFull = () => {
        const isTeamFull = Object.keys(this.state.userTeam).length === 8
        return isTeamFull
    }


    renderUserTeam = () => {
        const { rounds } = this.state
        return this.state.positionLayout.map(pos => {
            const old_ = this.state.currentUserTeam.rounds[`r${rounds.length}`] ? this.state.currentUserTeam.rounds[`r${rounds.length}`][pos] : ''
            const new_ = this.state.userTeam[pos]
            const isNew = new_ !== old_ && new_ ? true : false

            return (
                <div key={pos} className={[styles.player, styles[pos], 'up'].join(' ')}>
                    <span>{pos.toUpperCase()}</span>
                    <span className={isNew ? styles.spanfull : ''}>
                        {isNew ? new_ : old_}
                    </span>
                </div>
            )
        })
    }

    mergeTeams = (newTeam, oldTeam) => {
        let result = {}
        Object.keys(oldTeam).forEach(pos => {
            if (newTeam[pos]) {
                result[pos] = newTeam[pos]
            } else {
                result[pos] = oldTeam[pos]
            }
        })
        return result
    }

    handleSubmitTeam = async e => {
        e.preventDefault()
        const { teamName, teamLogo, userTeam, currentUserTeam, rounds, user } = this.state
        const { teamLogoErr, teamNameErr, teamUniqueName } = this.state.errors

        if (!teamLogoErr && !teamNameErr && !teamUniqueName && this.updateIsTeamFull()) {
            console.log("UPDATED TEAM IS SENT");
            const round = `r${rounds[rounds.length - 1] + 1}`
            const payload = {
                teamName: teamName.trim(),
                teamLogo: teamLogo.trim(),
                rounds: {
                    ...currentUserTeam.rounds,
                    [round]: this.mergeTeams(userTeam, currentUserTeam.rounds[`r${rounds.length - 1}`])
                }
            }
            const name = this.state.user.email.split('.').join('-')
            const idToken = await user.getIdToken()

            fetch(`https://softuni-react-final.firebaseio.com/users/${name}.json?auth=${idToken}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.props.history.push('/')
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            this.editErrors('submitError', true)
        }
    }

    changeHandlers = {
        teamName: v => {
            return this.setState({
                teamName: v
            })
        },
        teamLogo: v => {
            return this.setState({
                teamLogo: v
            })
        }
    }

    blurHandlers = {
        teamName: async v => {
            if (!v) {
                this.editErrors('teamName', true)
            } else if (!await this.uniqueTeamNameCheck(v)) {
                this.editErrors('teamUniqueName', true)
                this.editErrors('teamName', false)
            } else {
                this.editErrors('teamName', false)
                this.editErrors('teamUniqueName', false)
            }
        },
        teamLogo: v => {
            if (!v) {
                this.editErrors('teamLogo', true)
            } else {
                this.editErrors('teamLogo', false)
            }
        }
    }

    uniqueTeamNameCheck = async (teamName) => {
        if (teamName !== this.state.currentUserTeam.teamName) {
            getUserTeams().then(data => {
                const isUnique = Object
                    .values(data)
                    .filter(x => {
                        return x.teamName === teamName
                    }).length ? false : true
                return isUnique
            })
        } else {
            return true
        }

    }

    editErrors = (err, val) => {
        const newErrors = this.state.errors
        newErrors[err] = val
        this.setState({ errors: newErrors })
    }
    render() {
        const { players, chosenClub, currentUserTeam, rounds, teamName, teamLogo, badgeSelected } = this.state
        const teamNameErr = this.state.errors.teamName
        const teamUniqueNameErr = this.state.errors.teamUniqueName
        const teamLogoErr = this.state.errors.teamLogo
        const submitError = this.state.errors.submitError
        let positions = ''
        if (chosenClub) {
            [positions] = Object.values(chosenClub)
        }

        if (players && currentUserTeam && rounds) {
            return (
                <form onSubmit={this.handleSubmitTeam} className={styles.form}>
                    <h1 className={[styles.heading, 'up'].join(' ')}>Edit your team!</h1>
                    <ErrorMsg error={teamNameErr} msg="Please select a name for your team!" />
                    <ErrorMsg error={teamUniqueNameErr} msg="This team name is already taken!" />
                    <ErrorMsg error={teamLogoErr} msg="Please add a logo URL for your team!" />

                    <div className={styles.input}>
                        <Input error={teamNameErr || teamUniqueNameErr ? 'error' : ''} id="teamName" label="Team Name" onChange={this.changeHandlers.teamName} value={teamName} onBlur={this.blurHandlers.teamName}></Input>
                        <Input error={teamLogoErr ? 'error' : ''} id="teamLogo" label="Team Logo" onChange={this.changeHandlers.teamLogo} value={teamLogo} onBlur={this.blurHandlers.teamLogo}></Input>
                    </div>

                    <div className={styles.myteamcontainer}>
                        <h3 className='up'>Your team!</h3>

                        {/* <ErrorMsg error={!isTeamFull} msg="Your team is not complete!" /> */}
                        <div className={styles.myteam}>
                            {this.renderUserTeam()}
                        </div>

                    </div>
                    <div className={styles.logos}>
                        {players.map(p => {
                            const [name] = Object.keys(p)
                            return (<Badge name={name} onClick={this.selectClub} key={name} selected={badgeSelected} />
                            )
                        })}
                    </div>
                    <div className={styles.playerscontainer}>
                        {positions &&
                            positions.map(p => {
                                if (p) {
                                    const [positionName] = Object.keys(p)
                                    const playersArray = p[positionName]
                                    return (
                                        <div className={styles[positionName]} key={positionName}>
                                            <h3 className='up'>{positionName}</h3>
                                            {playersArray.map(pl => {
                                                return (
                                                    <a href="" onClick={this.addPlayerToTeam} data-position={positionName} key={pl.name}>
                                                        {pl.name}
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            })}
                    </div>
                    <ErrorMsg error={submitError} msg="Your team is not complete!" />
                    <SubmitBtn title="Edit your team!" />
                </form>
            );
        } else {
            return <Loading />

        }
    }
}

export default withRouter(EditTeam);