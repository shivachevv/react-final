import React, { Fragment, useEffect, useRef } from 'react';
import styles from './popup.module.scss'


function Popup({ data, closePopup }) {
    const positions = {
        'gk': 'Goalkeeper',
        'dr': 'Right Defender',
        'dc': 'Central Defender',
        'dl': 'Left Defender',
        'mr': 'Right Midfielder',
        'mc': 'Central Midfielder',
        'ml': 'Left Midfielder',
        'st': 'Striker'
    }

    const prettyPosition = (pos) => {
        return positions[pos.toLowerCase()]
    }
    const prettyTeam = (team) => {
        return team.toLowerCase().split('_').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' ')
    }

    const renderPlayerPts = () => {
        return data.rounds.map((x, i) => {
            if (i > 0) {
                return (
                    <div key={i} className={styles.popuproundpointspoints}>
                        <span>{i}</span>
                        <span>{x.pts}</span>
                    </div>
                )
            }
        })
    }

    const closeHandler = e => {
        e.preventDefault()
        return closePopup()
    }


    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                closePopup()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    return (
        <div className={styles.container}>
            <div ref={wrapperRef} className={styles.popup}>
                <div className={styles.popupclose}>
                    <span>Player Information</span>
                    <a href="#" onClick={closeHandler} className={styles.popupcloselink}><img src="http://ff-legends.com/images/close.png" alt="Close" /></a>
                </div>
                <div className={styles.popupname}>
                    <img src={`http://ff-legends.com/images/teamkits/${data.shirt}.png`} alt="Shirt" />
                    <div className={styles.popupnamecont}>
                        <span className={styles.popupplayername}>{data.name}</span>
                        <span className={styles.popupplayerteam}>{prettyTeam(data.team)}</span>
                        <span className={styles.popupplayerpos}>{prettyPosition(data.pos)}</span>
                    </div>
                </div>
                <div className={styles.popuproundpoints}>
                    <div className={styles.popuproundpointsheader}>
                        <span>Round</span>
                        <span>Points</span>
                    </div>
                    <div className={styles.popuproundpointscontainer}>
                        {renderPlayerPts()}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Popup;