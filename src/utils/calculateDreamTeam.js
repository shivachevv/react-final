import getAllPlayersPts from './getAllPlayersPts'

const calculateDreamTeam = async () => {
    const players = await getAllPlayersPts()


    const calcTotalPerPlayer = (player) => {
        let sum = 0
        player.rounds.forEach((round, i) => {
            if (i > 0) {
                sum += Number(round.pts)
            }
        })
        return sum
    }


    const sortPlayers = (obj, pos) => {
        let temp = { ...obj }
        Object.values(temp).forEach(player => {
            player["total"] = calcTotalPerPlayer(player)
        })

        const sorted = Object.values(temp).sort((x, y) => {
            return y.total - x.total
        })
        return sorted
    }

    let result = {}
    let positions = ['gk', 'dl', 'dc', 'dr', 'ml', 'mc', 'mr', 'st']

    Object.keys(players).forEach(x => {
        Object.keys(players[x]).forEach(y => {
            if (result[y]) {
                result[y] = { ...result[y], ...players[x][y] }
            } else {
                result[y] = {}
                result[y] = { ...result[y], ...players[x][y] }
            }
        })
    });

    const towReady = positions.map(position => {
        return sortPlayers(result[position], position)[0]
    })

    return towReady
}

export default calculateDreamTeam