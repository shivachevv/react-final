
const defineLinks = (user) => {
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
                path: "/myteam/:id",
                label: "My Team"
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