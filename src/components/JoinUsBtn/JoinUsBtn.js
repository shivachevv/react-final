import React from 'react';
import { Link } from 'react-router-dom'
import styles from './joinusbtn.module.scss'

function JoinUsBtn(props) {
    return (
        <Link className={styles.joinus} to="/register">Join us now!</Link>
    );
}

export default JoinUsBtn;