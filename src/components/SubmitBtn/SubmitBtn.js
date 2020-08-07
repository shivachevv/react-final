import React from 'react';
import styles from './submitbtn.module.scss'

function SubmitBtn({title}) {
    return (
        <button className={[styles.button, 'up'].join(' ')} type="submit">{title}</button>
    );
}

export default SubmitBtn;