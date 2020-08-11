import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom'
import Loading from './components/Loading/Loading'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import CreateTeam from './views/CreateTeam/CreateTeam'
import TeamDetails from './views/TeamDetails/TeamDetails'
import EditTeam from './views/EditTeam/EditTeam'
import AdminPanel from './views/AdminPanel/AdminPanel'
import ErrorPage from './views/ErrorPage/ErrorPage'
import getUserTeams from './utils/getUserTeams'

const Routes = (props) => {
    const history = useHistory();
    const user = props.user
    const [createTeamGuard, setCreateTeamGuard] = useState(true)
    const [editTeamGuard, setEditTeamGuard] = useState(true)
    const [adminGuard, setAdminGuard] = useState(false)

    const [adminLoading, setAdminLoading] = useState(true)
    const [createTeamLoading, setCreateTeamLoading] = useState(true)

    // CREATE TEAM GUARD
    useEffect(() => {
        console.log('register check1')
        async function createTeamGuardFn() {
            console.log('register check2')
            if (user) {
                console.log('register check3')
                const endpoint = user.email.split('.').join('-')
                const response = await fetch(`https://softuni-react-final.firebaseio.com/users/${endpoint}.json`)
                const data = await response.json()
                console.log(`https://softuni-react-final.firebaseio.com/users/${endpoint}.json`, data)
                if (!data) {
                    console.log('register check4')

                    setCreateTeamGuard(false)
                    setCreateTeamLoading(false)
                } else if (data && !data.teamName) {
                    console.log('register check5')
                    setCreateTeamGuard(false)
                    setCreateTeamLoading(false)
                }
                else {
                    console.log('register check6')

                    setCreateTeamGuard(true)
                    setCreateTeamLoading(false)
                }
            } else {
                console.log('register check7')
                setCreateTeamGuard(true)
                setCreateTeamLoading(false)
            }
        }
        createTeamGuardFn();
    }, [user])

    // EDIT TEAM GUARD
    useEffect(() => {
        const ac = new AbortController()
        const path = history.location.pathname
        const pathTeam = path.includes('edit') ? path.split('/')[3] : ''
        if (user) {
            getUserTeams().then(teams => {
                const [team] = Object.values(teams).filter(x => {
                    if (x.teamName) {
                        let modified = x.teamName.toLowerCase().split(' ').join('-')
                        return modified === pathTeam
                    }
                })
                if (team) { setEditTeamGuard(team.uid === user.uid) }
            })
        }
        return () => ac.abort()
    }, [history, user])

    // ADMIN PANEL GUARD 
    useEffect(() => {
        if (user) {
            getUserTeams().then(teams => {
                const [team] = Object.values(teams).filter(x => {
                    if (x.uid) {
                        return x.uid === user.uid
                    }
                })

                if (team) {
                    setAdminGuard(team.isAdmin)
                    setAdminLoading(false)
                }

            })
        } else {
            setAdminGuard(false)
            setAdminLoading(false)
        }
    }, [user])

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
                if (createTeamLoading) {
                    console.log('final check1')
                    return <Loading />
                } else {
                    console.log('final check1')

                    return createTeamGuard ? <Redirect to="/" /> : <CreateTeam />
                }
            }
            } />
            <Route path="/team-details/:id" exact component={TeamDetails} />
            <Route path="/team-details/edit/:id" exact render={() => {
                console.log(editTeamGuard);
                return editTeamGuard ? <EditTeam /> : <Redirect to="/" />
            }
            } />
            <Route path="/admin" exact render={() => {
                if (adminLoading) {
                    return <Loading />
                } else {
                    return adminGuard ? <AdminPanel /> : <Redirect to="/" />
                }
            }
            } />


            <Route component={ErrorPage} />
        </Switch>
    )
};

export default withRouter(Routes)