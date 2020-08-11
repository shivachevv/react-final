import React, { useState, useEffect, Fragment } from 'react';
import getUserTeams from '../../utils/getUserTeams';
import RibbonBadge from './RibbonBadge';
import styles from './teamsribbon.module.scss'


function TeamsRibbon(props) {
    const [userTeams, setUserTeams] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getUserTeams().then(data => setUserTeams(Object.values(data)))
    }, [])
    useEffect(() => {
        setLoading(userTeams ? false : true)
    }, [userTeams])

    const transformTeamName = (v) => {
        return v ? v.split(' ').join('-').toLowerCase() : undefined
    }

    return (
        <Fragment>
            {loading && <div>Loading...</div>}
            {!loading &&
                <section className={[styles.container, 'sha'].join(' ')}>
                    {userTeams.map(team => {
                        return transformTeamName(team.teamName) ?
                            <RibbonBadge key={team.teamName} path={transformTeamName(team.teamName)} logo={team.teamLogo} />
                            : ''
                    })}
                </section>
            }
        </Fragment>
    );
}

export default TeamsRibbon;