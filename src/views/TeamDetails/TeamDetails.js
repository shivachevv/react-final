import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import getUserTeams from '../../utils/getUserTeams'
import styles from './teamdetails.module.scss';
import TeamHeader from '../../components/TeamHeader/TeamHeader';
import TeamField from '../../components/TeamField/TeamField';
import EditTeamBtn from '../../components/EditTeamBtn/EditTeamBtn';
import { UserContext } from '../../UserProvider'

function TeamDetails(props) {
    const user = useContext(UserContext)
    const [teamId, setTeamId] = useState(props.match.params.id)
    const [userTeam, setUserTeam] = useState(null)
    const [isEditAllowed, setIsEditAllowed] = useState(false)

    // GET USER ID FROM CONTEXT
    useEffect(() => {
        if (user && userTeam) {
            // const changed = userTeam.email.split('@').map(x => {

            // })
            setIsEditAllowed(user.email === userTeam.email)
        }
    }, [user, userTeam])
    // GET TEAM ID FROM PARAMS
    useEffect(() => {
        setTeamId(props.match.params.id)
    }, [props.match.params.id])
    // GET TEAM DETAILS VIA TEAM ID
    useEffect(() => {
        getUserTeams().then(data => {
            const [result] = Object.entries(data).filter(x => {
                return x[1].teamName.split(' ').join('-').toLowerCase() === teamId
            })
            const [teamEmail, userTeam] = result
            setUserTeam({ team: userTeam, email: teamEmail })
        })
    }, [teamId])

    return (
        <div className={styles.container}>
            {!userTeam && <div>Loading...</div>}
            {userTeam &&
                <Fragment>
                    <TeamHeader teamName={userTeam.team.teamName} teamLogo={userTeam.team.teamLogo} />
                    <TeamField rounds={userTeam.team.rounds} />
                    {isEditAllowed &&
                        <EditTeamBtn id={teamId} />
                    }
                </Fragment>
            }

        </div>
    );
}

export default withRouter(TeamDetails);