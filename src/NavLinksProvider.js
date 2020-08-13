
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
            },
            {
                path: "/about",
                label: "About FFL"
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
            },
            {
                path: "/about",
                label: "About FFL"
            }
        ]
    }
}


export default defineLinks