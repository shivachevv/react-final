import React from 'react';
import styles from './slide.module.scss'

function Slide({ width, content }) {
    const slideStyle = {
        width: `${width}px`,
    }
    const beautifyTeam = (n) => {
        return n.split('_').join(' ').toUpperCase()
    }
    return (
        <div style={slideStyle} className={styles.container}>
            <img src={`http://ff-legends.com/images/teamkits/${content.shirt}.png`} alt="Player"/>
            <h3 className={styles.pos}>Position: {content.pos}</h3>
            <h3 className={styles.name}>{content.name} : {content.total}pts</h3>
            <h3 className={styles.team}>{beautifyTeam(content.team)}</h3>
        </div>
    );
}

export default Slide;