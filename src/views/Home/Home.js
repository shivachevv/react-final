import React, { useEffect, useState, useContext, Fragment } from 'react';
import styles from './home.module.scss'
import { UserContext } from '../../UserProvider'
import JoinUsBtn from '../../components/JoinUsBtn/JoinUsBtn'
import Slider from '../../components/Slider/Slider'
import TeamsRibbon from '../../components/TeamsRibbon/TeamsRibbon'
// import getAllPlayers from '../../utils/getAllPlayers';
import calculateDreamTeam from '../../utils/calculateDreamTeam'
import Loading from '../../components/Loading/Loading'


const Home = () => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [dreamTeam, setDreamTeam] = useState(null)

  useEffect(() => {
    setLoading(false)
  }, [user])

  useEffect(() => {
    const ac = new AbortController()

    calculateDreamTeam().then(data => setDreamTeam(data))
    return () => ac.abort()
  }, [])

  if (loading) {
    return <Loading />
  } else {

    return (
      <div className={styles.container}>
        {!user && !dreamTeam && <Loading />}
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



