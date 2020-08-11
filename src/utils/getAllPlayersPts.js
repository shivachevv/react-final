const API_PLAYERS_URL = 'https://softuni-react-final.firebaseio.com/allPlayersPts.json'

const getAllPlayersPts = async () => {
    const response = await fetch(API_PLAYERS_URL)
    const data = await response.json()
    return data
}

export default getAllPlayersPts