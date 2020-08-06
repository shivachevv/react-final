import React from 'react';
import styles from './badge.module.scss'

function Badge({name, onClick, selected}) {
    const clickHandler = (e) => {
        return onClick(e)
    }
    return (
        <a onClick={clickHandler} href="" data-team={name} className={[styles.logo, selected === name ? styles.selected : '' ].join(' ')}>
            <img src={require(`../../images/${name}.png`)} />
        </a>
    );
}

export default Badge;