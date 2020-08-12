import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import getUserTeams from '../../utils/getUserTeams'
import styles from './teamdetails.module.scss';
import TeamHeader from '../../components/TeamHeader/TeamHeader';
import TeamField from '../../components/TeamField/TeamField';
import EditTeamBtn from '../../components/EditTeamBtn/EditTeamBtn';
import { UserContext } from '../../UserProvider'
import Loading from '../../components/Loading/Loading'
import changePageTitle from '../../utils/changePageTitle'

function TeamDetails(props) {
    const user = useContext(UserContext)
    const [teamId, setTeamId] = useState(props.match.params.id)
    const [userTeam, setUserTeam] = useState(null)
    const [isEditAllowed, setIsEditAllowed] = useState(false)

    // GET USER ID FROM CONTEXT
    useEffect(() => {
        changePageTitle("Team page")
        
        if (user && userTeam) {
            setIsEditAllowed(user.uid === userTeam.uid)
            changePageTitle(`${userTeam.teamName}: Team page`)
        } else {
            setIsEditAllowed(false)
        }
    }, [user, userTeam])

    // GET TEAM ID FROM PARAMS
    useEffect(() => {
        setTeamId(props.match.params.id)
    }, [props.match.params.id])

    // GET TEAM DETAILS VIA TEAM ID
    useEffect(() => {
        getUserTeams().then(data => {
            const [result] = Object.values(data).filter(x => {
                if (x.teamName) {
                    return x.teamName.split(' ').join('-').toLowerCase() === teamId
                }
            })
            setUserTeam(result)
        })
    }, [teamId])

    return (
        <div className={styles.container}>
            {!userTeam && <Loading />}
            {userTeam &&
                <Fragment>
                    <TeamHeader teamName={userTeam.teamName} teamLogo={userTeam.teamLogo} />
                    <TeamField teamsPerRnd={userTeam.rounds} />
                    {isEditAllowed &&
                        <EditTeamBtn id={teamId} />
                    }
                </Fragment>
            }

        </div>
    );
}

export default withRouter(TeamDetails);