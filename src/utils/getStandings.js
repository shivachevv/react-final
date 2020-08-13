import getUserTeams from './getUserTeams'
import getPlayersStats from './getPlayersStats'

const getStandings = async (max) => {
    const teams = await getUserTeams()
    const players = await getPlayersStats()

    const equalName = (v) => {
        return v.toLowerCase().split(' ').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' ').split('.').join('_')
    }

    const sortStandigs = (obj) => {
        let temp = { ...obj }

        const sorted = Object.entries(temp).sort((x, y) => {
            return y[1].total - x[1].total
        })
        return sorted
    }

    let standings = {}
    Object.values(teams).forEach(user => {
        standings[user.teamName] = {}
        let sum = 0
        Object.keys(user.rounds).forEach(r => {
            const round = user.rounds[r]
            const rndNumber = Number(r.slice(1))
            Object.keys(round).forEach(pos => {
                const player = round[pos]
                const playerData = players[equalName(player)]
                if (rndNumber <= max) {
                    const pts = Number(playerData.rounds[rndNumber].pts)
                    sum += pts
                }
            })

        })
        standings[user.teamName].total = sum
        standings[user.teamName].teamLogo = user.teamLogo
    });

    const sortedStandings = sortStandigs(standings)

    return sortedStandings
}

export default getStandings