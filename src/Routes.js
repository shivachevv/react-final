import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import CreateTeam from './views/CreateTeam/CreateTeam'
import ErrorPage from './views/ErrorPage/ErrorPage'

const Routes = (props) => {
    const user = props.user
    const [createTeamGuard, setCreateTeamGuard] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function createTeamGuardFn() {
            if (user) {
                const endpoint = user.email.split('.').join('-')
                const response = await fetch(`https://softuni-react-final.firebaseio.com/users/${endpoint}.json`)
                const data = await response.json()
                if (!data) {
                    setCreateTeamGuard(false)
                    setIsLoading(false)
                } else {
                    setCreateTeamGuard(true)
                    setIsLoading(false)
                }
            }
        }
        createTeamGuardFn();
    }, [])

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact render={() => {
                return user ? <Redirect to="/" /> : <Login />
            }
            } />
            <Route path="/register" exact render={() => {
                return user ? <Redirect to="/" /> : <Register />
            }
            } />
            <Route path="/create-team" exact render={() => {
                if (isLoading) {
                    return <div>Loading...</div>
                } else {
                    return createTeamGuard ? <Redirect to="/" /> : <CreateTeam />
                }
            }
            } />

            <Route component={ErrorPage} />
        </Switch>
    )
};

export default Routes