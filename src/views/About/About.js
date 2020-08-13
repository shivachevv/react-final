import React, { useEffect } from 'react';
import Map from './Map'
import styles from './about.module.scss'
import changePageTitle from '../../utils/changePageTitle'
import JoinUsBtn from '../../components/JoinUsBtn/JoinUsBtn'


const About = () => {

    useEffect(() => {
        changePageTitle("About FFL")
    }, [])


    const aboutTextContent = [
        'Welcome to the next level fantasy experience!',
        'FFL will provide for you with the ultimate fantasy soccer idea.\
        Why play in a boring competition with the clubs from only 1 country when you can \
        take advantage of the stars from ALL OVER EUROPE!',
        'FFL gives you the chance to pick 16 players on a draft basis from 8 countries:\
        England, Germany, Italy, Spain, France, Portugal, Turkey and Netherlands!',
        'Found out more fun and excitement on our site and contact us for more informaiton!'
    ]

    const importantTxt = [
        'experience', 'ultimate', 'FFL'
    ]

    const makeTextStrong = (str) => {
        return str
    }

    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <div className={styles.text}>
                    <h1>About FFL</h1>
                    {aboutTextContent.map((x, i) => {
                        return (<p key={i}>
                            {makeTextStrong(x)}
                        </p>)
                    })
                    }
                    <JoinUsBtn />
                </div>
                <div className={styles.map}>
                    <h1>Find us!</h1>
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default About;