import React, { Component } from 'react';

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: '',
            chosenClub: '',
            userTeam: {}
        }
    }

    async componentDidMount() {
        const response = await fetch('https://softuni-react-final.firebaseio.com/allPlayersData.json')
        const data = await response.json()
        this.setState({
            players: data.data
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
    }

    isThereUserTeam = () => {
        return Object.keys(this.state.userTeam).length
    }

    handleSubmitTeam = (e) => {
        e.preventDefault()
        console.log(this.state.userTeam);
    }

    render() {
        const { players, chosenClub, userTeam } = this.state
        let positions = ''
        if (chosenClub) {
            [positions] = Object.values(chosenClub)
        }

        if (players) {
            return (
                <form onSubmit={this.handleSubmitTeam}>
                    <h1>Choose your team!</h1>
                    <div>
                        <h3>Your team!</h3>
                        <div>
                            {this.isThereUserTeam() &&
                                Object.keys(userTeam).map(pos => {
                                    const name = userTeam[pos]
                                    return (
                                        <div key={pos}>
                                            <span>{pos}: </span>
                                            <span>{name}</span>
                                        </div>
                                    )
                                })
                            }
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