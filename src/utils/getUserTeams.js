const API_USERS_URL = 'https://softuni-react-final.firebaseio.com/users.json'

const getUserTeams = async () => {
    const response = await fetch(API_USERS_URL)
    const data = await response.json()
    return data
}

export default getUserTeams