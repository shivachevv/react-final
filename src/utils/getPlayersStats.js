import getAllPlayers from './getAllPlayers'

const getPlayersStats = async () => {
    const players = await getAllPlayers()

    let result = {}
    
    const individualPlayers = players.data.map((a, i) => {
        Object.values(a).map(b => {
            Object.values(b).map(c => {
                if (c) {
                    const [pos] = Object.keys(c)                    
                    c[pos].map(d => {
                        result[d.name] = d
                    })
                }
            })
        })

    })

    

    return result
}

export default getPlayersStats