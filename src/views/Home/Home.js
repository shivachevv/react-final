import React, { useEffect, useState, useContext, Fragment } from 'react';
import styles from './home.module.scss'
import { UserContext } from '../../UserProvider'
import JoinUsBtn from '../../components/JoinUsBtn/JoinUsBtn'
import Slider from '../../components/Slider/Slider'
import images from '../../components/Slider/slides'
// import getAllPlayers from '../../utils/getAllPlayers';
import calculateTow from '../../utils/calculateTow'

const Home = () => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [tow, setTow] = useState(null) // TOW => Team Of the Week

  useEffect(() => {
    setLoading(false)
  }, [user])

  useEffect(() => {
    calculateTow().then(data => setTow(data))
  }, [])

  if (loading) {
    return (<div>Loading...</div>)
  } else {

    return (
      <div className={styles.container}>
        {!user && !tow && <div>Loading...</div>}
        {!user && tow &&
          <Fragment>
            <section className={styles.homebanner}>
              <JoinUsBtn />
            </section>
            <section className={styles.towSpinner}>
              <h1>Team of the week</h1>
              <Slider slides={tow}></Slider>
            </section>
          </Fragment>
        }

      </div>
    )
  }
};

export default Home;



