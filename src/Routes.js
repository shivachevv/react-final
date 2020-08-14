import React from 'react'
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import CreateTeam from './views/CreateTeam/CreateTeam'
import TeamDetails from './views/TeamDetails/TeamDetails'
import EditTeam from './views/EditTeam/EditTeam'
import AdminPanel from './views/AdminPanel/AdminPanel'
import Standings from './views/Standings/Standings'
import About from './views/About/About'
import ErrorPage from './views/ErrorPage/ErrorPage'
import AdminGuard from './RouteGuards/AdminGuard'
import EditTeamGuard from './RouteGuards/EditTeamGuard'
import CreateTeamGuard from './RouteGuards/CreateTeamGuard'
import LoginGuard from './RouteGuards/LoginGuard'
import RegisterGuard from './RouteGuards/RegisterGuard'


const Routes = (props) => {
    const user = props.user

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/team-details/:id" exact component={TeamDetails} />
            <Route path="/standings" exact component={Standings} />
            <Route path="/about" exact component={About} />           

            <LoginGuard path="/login" component={Login} user={user} />
            <RegisterGuard path="/register" component={Register} user={user} />
            <CreateTeamGuard path="/create-team" component={CreateTeam} user={user} />
            <EditTeamGuard path="/edit-team/:id" component={EditTeam} user={user} />
            <AdminGuard path="/admin" component={AdminPanel} user={user} />

            <Route component={ErrorPage} />
        </Switch>
    )
};

export default withRouter(Routes)