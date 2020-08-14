import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

const CreateTeamGuard = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { user, component: Component, ...rest } = props;

    // CREATE TEAM GUARD
    useEffect(() => {
        async function createTeamGuardFn() {
            if (user) {
                const endpoint = user.email.split('.').join('-')
                const response = await fetch(`https://softuni-react-final.firebaseio.com/users/${endpoint}.json`)
                const data = await response.json()
                if (!data) {
                    setIsAuthenticated(true)
                    setLoading(false)
                } else if (data && !data.teamName) {
                    setIsAuthenticated(true)
                    setLoading(false)
                }
                else {
                    setIsAuthenticated(false)
                    setLoading(false)
                }
            } else {
                setIsAuthenticated(false)
                setLoading(false)
            }
        }
        createTeamGuardFn();
    }, [])

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

export default CreateTeamGuard