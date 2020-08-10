import React from 'react';
import styles from './changerndbtn.module.scss'

function ChangeRndBtn({ onClick, title, rnd }) {
    const clickHandler = () => {
        return title.includes('Next') ?
            onClick(rnd + 1) :
            onClick(rnd - 1)
    }
    return (
        <button className={styles.button} onClick={clickHandler}>{title}</button>
    );
}

export default ChangeRndBtn;