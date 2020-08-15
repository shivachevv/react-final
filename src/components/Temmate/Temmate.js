import React from 'react';
import styles from './teammate.module.scss'

function Temmate({ player, playerPts, popupHandler }) {

    const beautifyTeam = (v) => {
        return v.split('_').join(' ').toUpperCase()
    }

    const handleClick = (x) => {
        return popupHandler(x.toLowerCase())
    }

    const { name, pos, shirt, team } = player
    return (
        <div className={[styles.teammate, styles[pos]].join(' ')} onClick={() => handleClick(pos)}>
            <img src={`http://ff-legends.com/images/teamkits/${shirt}.png`} alt="shirt"/>
            <div>
                <h3 className={styles.pos}>Position: {pos}</h3>
                <h3 className={styles.name}>{name} : {playerPts ? playerPts : ''} pts</h3>
                <h3 className={styles.team}>{beautifyTeam(team)}</h3>
            </div>
        </div>
    );
}

export default Temmate;