
const defineLinks = (user, loggedId, logo) => {
    if (user) {
        return [
            {
                path: "/",
                label: "Home"
            },
            {
                path: "/standings",
                label: "Standings"
            },
            {
                path: `/team-details/${loggedId}`,
                label: "My Team",
                logo: logo
            }
        ]
    } else {
        return [
            {
                path: "/",
                label: "Home"
            },
            {
                path: "/standings",
                label: "Standings"
            },
            {
                path: "/login",
                label: "Login"
            },
            {
                path: "/register",
                label: "Register"
            }
        ]
    }
}


export default defineLinks