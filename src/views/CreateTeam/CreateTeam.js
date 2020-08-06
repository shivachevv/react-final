import React, { Component } from 'react';
import { UserContext } from '../../UserProvider'
import Input from '../../components/Input/Input'


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
                teamLogo: false,
            },
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
                <div key={pos}>
                    <span>{pos.toUpperCase()}: </span>
                    <span>{this.state.userTeam[pos]}</span>
                </div>
            )
        })
    }

    handleSubmitTeam = (e) => {
        e.preventDefault()
        const { isTeamFull, teamName, teamLogo, userTeam } = this.state
        const { teamLogoErr, teamNameErr } = this.state.errors
        if (isTeamFull && !teamLogoErr && !teamNameErr) {
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
            console.log('OOPS');
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
        teamName: v => {
            if (!v) {
                this.editErrors('teamName', true)
            } else {
                this.editErrors('teamName', false)
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

    editErrors = (err, val) => {
        const newErrors = this.state.errors
        newErrors[err] = val
        this.setState({ errors: newErrors })
    }
    render() {
        const { players, chosenClub, userTeam, isTeamFull, teamName, teamLogo } = this.state
        const teamNameErr = this.state.errors.teamName
        const teamLogoErr = this.state.errors.teamLogo
        let positions = ''
        if (chosenClub) {
            [positions] = Object.values(chosenClub)
        }

        if (players) {
            return (
                <form onSubmit={this.handleSubmitTeam}>
                    <h1>Choose your team!</h1>
                    {teamNameErr ? (<h3>Please select a name for your team!</h3>) : ''}
                    {teamLogoErr ? (<h3>Please add a logo URL for your team!</h3>) : ''}
                    <div>
                        <Input error={teamNameErr ? 'error' : ''} id="teamName" label="Team Name" onChange={this.changeHandlers.teamName} value={teamName} onBlur={this.blurHandlers.teamName}></Input>
                        <Input error={teamLogoErr ? 'error' : ''} id="teamLogo" label="Team Logo" onChange={this.changeHandlers.teamLogo} value={teamLogo} onBlur={this.blurHandlers.teamLogo}></Input>
                    </div>

                    <div>
                        <h3>Your team!</h3>
                        {!isTeamFull ? (<h3>Your team is not complete!</h3>) : ''}
                        <div>
                            {this.renderUserTeam()}
                        </div>

                    </div>
                    <div>
                        {players.map(p => {
                            const name = Object.keys(p)
                            return (<a onClick={this.selectClub} href="" data-team={name} key={name}>
                                <img src={require(`../../images/${name}.png`)} />
                            </a>)
                        })}
                    </div>
                    {positions &&
                        positions.map(p => {
                            const positionName = Object.keys(p)
                            const playersArray = p[positionName]
                            return (<div key={positionName}>
                                <h3>{positionName}</h3>
                                {playersArray.map(pl => {
                                    return (
                                        <a href="" onClick={this.addPlayerToTeam} data-position={positionName} key={pl.name}>
                                            {pl.name}
                                        </a>
                                    )
                                })}
                            </div>)
                        })}
                    <button>Submit Team!</button>
                </form>
            );
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default CreateTeam;