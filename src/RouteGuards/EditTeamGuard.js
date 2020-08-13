import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import getUserTeams from '../utils/getUserTeams'

const EditTeamGuard = (props) => {
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { component: Component, ...rest } = props;

    useEffect(() => {
        const path = history.location.pathname
        const pathTeam = path.includes('edit') ? path.split('/')[2] : ''
        const fetchData = async () => {
            const teams = await getUserTeams();
            // const teams = await result.json()
            const [team] = Object.values(teams).filter(x => {
                if (x.teamName) {
                    let modified = x.teamName.toLowerCase().split(' ').join('-')
                    return modified === pathTeam
                }
            })
            if (team) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setLoading(false);
        };
        fetchData();
    }, []);

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

export default EditTeamGuard