import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

const RegisterGuard = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { user, component: Component, ...rest } = props;

    // REGISTER GUARD
    useEffect(() => {
        if (user) {
            setIsAuthenticated(false)
            setLoading(false)
        } else {
            setIsAuthenticated(true)
            setLoading(false)
        }
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

export default RegisterGuard