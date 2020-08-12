import getAllPlayersPts from './getAllPlayersPts'

const getPlayersStats = async () => {
    const players = await getAllPlayersPts()

    let result = {}

    Object.keys(players).forEach(x => {
        Object.keys(players[x]).forEach(y => {
            result = { ...result, ...players[x][y]}
        })
    });


    // const individualPlayers = players.data.map((a, i) => {
    //     Object.values(a).map(b => {
    //         Object.values(b).map(c => {
    //             if (c) {
    //                 const [pos] = Object.keys(c)                    
    //                 c[pos].map(d => {
    //                     result[d.name] = d
    //                 })
    //             }
    //         })
    //     })
    // })

        return result
}

export default getPlayersStats