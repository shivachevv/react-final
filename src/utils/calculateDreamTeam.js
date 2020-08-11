import getAllPlayers from './getAllPlayers'

const calculateDreamTeam = async () => {
    const players = await getAllPlayers()

    const sortPlayers = (arr) => {
        return arr.sort((a, b) => {
            return b.total - a.total
        })
    }

    let result = {}
    let tow = {}
    let positions = ['gk', 'dl', 'dc', 'dr', 'ml', 'mc', 'mr', 'st']

    const individualPlayers = players.data.map((a, i) => {
        const [team] = Object.keys(a)
        result[team] = {}
        Object.values(a).map(b => {
            Object.values(b).map(c => {
                if (c) {
                    const [pos] = Object.keys(c)
                    result[team][pos] = {}
                    if (!tow[pos]) {
                        tow[pos] = []
                    }
                    c[pos].map(d => {
                        result[team][pos][d.name.split('.').join('_')] = d
                        if (d.total) {
                            tow[pos].push(d)
                        }
                    })
                }
            })
        })

    })

    const towReady = positions.map(position => {
        return sortPlayers(tow[position])[0]
    })
    return towReady
}

export default calculateDreamTeam