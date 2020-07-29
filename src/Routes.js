import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import ErrorPage from './views/ErrorPage/ErrorPage'

const Routes = (props) => {
    const user = props.user

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
            <Route component={ErrorPage} />
        </Switch>
    )
};

export default Routes