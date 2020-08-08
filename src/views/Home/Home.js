import React, { useEffect, useState, useContext } from 'react';
import styles from './home.module.scss'
import { UserContext } from '../../UserProvider'
import JoinUsBtn from '../../components/JoinUsBtn/JoinUsBtn'
import Slider from '../../components/Slider/Slider'
import images from '../../components/Slider/slides'

const Home = () => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user])

  if (loading) {
    return (<div>Loading...</div>)
  } else {

    return (
      <div className={styles.container}>
        {!user &&
          <section className={styles.homebanner}>
            <JoinUsBtn />
          </section>}

        <section className={styles.towSpinner}>
          <h1>Team of the week</h1>
          <Slider slides={images}></Slider>
        </section>
      </div>
    )
  }
};

export default Home;



