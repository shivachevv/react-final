import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import getUserTeams from '../utils/getUserTeams'

const AdminGuard = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { user, component: Component, ...rest } = props;

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
                    setIsAuthenticated(team.isAdmin)
                    setLoading(false)
                }
                return 
            })
        } else {
            setIsAuthenticated(false)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user) {
            getUserTeams().then(teams => {
                const [team] = Object.values(teams).filter(x => {
                    if (x.uid) {
                        return x.uid === user.uid
                    }
                })
                if (team) {
                    setIsAuthenticated(team.isAdmin)
                    setLoading(false)
                }
            })
        } else {
            setIsAuthenticated(false)
            setLoading(false)
        }
    }, [user])

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : loading ? (
                    <Loading />
                ) : (
                            <Redirect
                                to={{ pathname: "/", }}
                            />
                        )
            }
        />
    );
};

export default AdminGuard