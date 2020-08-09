import React, { useEffect, useState, useContext, Fragment } from 'react';
import styles from './home.module.scss'
import { UserContext } from '../../UserProvider'
import JoinUsBtn from '../../components/JoinUsBtn/JoinUsBtn'
import Slider from '../../components/Slider/Slider'
import TeamsRibbon from '../../components/TeamsRibbon/TeamsRibbon'
// import getAllPlayers from '../../utils/getAllPlayers';
import calculateDreamTeam from '../../utils/calculateDreamTeam'

const Home = () => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [dreamTeam, setDreamTeam] = useState(null)

  useEffect(() => {
    setLoading(false)
  }, [user])

  useEffect(() => {
    calculateDreamTeam().then(data => setDreamTeam(data))
  }, [])

  if (loading) {
    return (<div>Loading...</div>)
  } else {

    return (
      <div className={styles.container}>
        <section className={[styles.teamsribbon, 'sha'].join(' ')}>
          <TeamsRibbon></TeamsRibbon>
        </section>
        {!user && !dreamTeam && <div>Loading...</div>}
        {!user && dreamTeam &&
          <Fragment>
            <section className={styles.homebanner}>
              <JoinUsBtn />
            </section>
            <section className={[styles.dreamteamspinner, 'sha'].join(' ')}>
              <h1 className="up">Dream team so far!</h1>
              <Slider slides={dreamTeam}></Slider>
            </section>
          </Fragment>
        }
        {user && dreamTeam &&
          <Fragment>
            <section className={[styles.dreamteamspinner, 'sha'].join(' ')}>
              <h1 className="up">Dream team so far!</h1>
              <Slider slides={dreamTeam}></Slider>
            </section>
          </Fragment>
        }

      </div>
    )
  }
};

export default Home;



