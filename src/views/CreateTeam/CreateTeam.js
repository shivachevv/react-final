import React, { Component } from 'react';
import { UserContext } from '../../UserProvider'
import Input from '../../components/Input/Input'
import Badge from '../../components/Badge/Badge'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn'
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg'

import styles from './createteam.module.scss'

class CreateTeam extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            players: '',
            chosenClub: '',
            userTeam: {},
            positionLayout: ['gk', 'dl', 'dc', 'dr', 'ml', 'mc', 'mr', 'st'],
            isTeamFull: false,
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


    async componentDidMount() {
        const response = await fetch('https://softuni-react-final.firebaseio.com/allPlayersData.json')
        const data = await response.json()
        this.setState({
            players: data.data,
            user: this.context
        })
    }

    updateIsTeamFull = () => {
        const isTeamFull = Object.keys(this.state.userTeam).length === 8
        return this.setState({
            isTeamFull
        })
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
        this.updateIsTeamFull()
    }

    isThereUserTeam = () => {
        return Object.keys(this.state.userTeam).length ? true : false
    }


    renderUserTeam = () => {
        return this.state.positionLayout.map(pos => {
            return (
                <div key={pos} className={[styles.player, styles[pos], 'up'].join(' ')}>
                    <span>{pos.toUpperCase()}</span>
                    <span className={this.state.userTeam[pos] ? styles.spanfull : ''}>{this.state.userTeam[pos]}</span>
                </div>
            )
        })
    }

    handleSubmitTeam = (e) => {
        e.preventDefault()
        const { isTeamFull, teamName, teamLogo, userTeam } = this.state
        const { teamLogoErr, teamNameErr, teamUniqueNameErr } = this.state.errors
        if (isTeamFull && !teamLogoErr && !teamNameErr && !teamUniqueNameErr) {
            console.log("TEAM IS SENT");
            const payload = {
                teamName,
                teamLogo,
                rounds: {
                    r1: userTeam
                }
            }
            const name = this.state.user.email.split('.').join('-')
            fetch(`https://softuni-react-final.firebaseio.com/users/${name}.json`, {
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
        const response = await fetch('https://softuni-react-final.firebaseio.com/users.json')
        const data = await response.json()
        const isUnique = Object
            .values(data)
            .filter(x => {
                return x.teamName === teamName
            }).length ? false : true
        return isUnique
    }

    editErrors = (err, val) => {
        const newErrors = this.state.errors
        newErrors[err] = val
        this.setState({ errors: newErrors })
    }
    render() {
        const { players, chosenClub, userTeam, isTeamFull, teamName, teamLogo, badgeSelected } = this.state
        const teamNameErr = this.state.errors.teamName
        const teamUniqueNameErr = this.state.errors.teamUniqueName
        const teamLogoErr = this.state.errors.teamLogo
        const submitError = this.state.errors.submitError
        let positions = ''
        if (chosenClub) {
            [positions] = Object.values(chosenClub)
        }

        if (players) {
            return (
                <form onSubmit={this.handleSubmitTeam} className={styles.form}>
                    <h1 className={[styles.heading, 'up'].join(' ')}>Choose your team!</h1>
                    <ErrorMsg error={teamNameErr} msg="Please select a name for your team!"/>
                    <ErrorMsg error={teamUniqueNameErr} msg="This team name is already taken!"/>
                    <ErrorMsg error={teamLogoErr} msg="Please add a logo URL for your team!"/>

                    <div className={styles.input}>
                        <Input error={teamNameErr || teamUniqueNameErr ? 'error' : ''} id="teamName" label="Team Name" onChange={this.changeHandlers.teamName} value={teamName} onBlur={this.blurHandlers.teamName}></Input>
                        <Input error={teamLogoErr ? 'error' : ''} id="teamLogo" label="Team Logo" onChange={this.changeHandlers.teamLogo} value={teamLogo} onBlur={this.blurHandlers.teamLogo}></Input>
                    </div>

                    <div className={styles.myteamcontainer}>
                        <h3 className='up'>Your team!</h3>

                        <ErrorMsg error={!isTeamFull} msg="Your team is not complete!"/>
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
                            })}
                    </div>
                    <ErrorMsg error={submitError} msg="You are missing something!"/>
                    <SubmitBtn title="Create your team!" />
                </form>
            );
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default CreateTeam;