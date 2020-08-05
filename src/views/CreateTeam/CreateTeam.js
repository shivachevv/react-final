import React, { Component } from 'react';
import { UserContext } from '../../UserProvider'

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
            isTeamFull: false
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

        if (this.state.isTeamFull) {
            console.log("TEAM IS SENT");
            const payload = this.state.userTeam
            const name = this.state.user.email.split('@')[0]
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
        }

    }

    render() {
        const { players, chosenClub, userTeam, isTeamFull } = this.state
        let positions = ''
        if (chosenClub) {
            [positions] = Object.values(chosenClub)
        }

        if (players) {
            return (
                <form onSubmit={this.handleSubmitTeam}>
                    <h1>Choose your team!</h1>
                    {!isTeamFull ? (<h3>Your team is not complete!</h3>) : ''}

                    <div>
                        <h3>Your team!</h3>
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