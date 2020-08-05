import React, { useEffect, useState } from 'react';
import styles from './home.module.scss'
import { auth } from '../../firebase'


const Home = () => {

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    return () => {
      console.log('USEEFFECT!!!!!!!!!');
    }
  }, [])

  return (
    <div>
      Home Page
      <p>{counter}</p>
      <button onClick={() => { setCounter(counter + 1) }}>ADD</button>
    </div>
  );
};

export default Home;



