const API_ROUNDS_URL = 'https://softuni-react-final.firebaseio.com/rounds.json'

const getRounds = async () => {
    const response = await fetch(API_ROUNDS_URL)
    const data = await response.json()
    return data
}

const addRound = async (payload) => {
    const response = await fetch(API_ROUNDS_URL, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    const data = await response.json()
    return data
}

export {
    getRounds,
    addRound
}