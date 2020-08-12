import React from 'react';
import { Link } from 'react-router-dom';
import styles from './errorpage.module.scss'
import changePageTitle from '../../utils/changePageTitle'

function ErrorPage(props) {
    changePageTitle("Page not found")

    return (
        <div className={styles.error}>
            <h1>¡Ay, caramba!</h1>
            <img src="https://alchetron.com/cdn/carlos-valderrama-23c0bfe9-4545-460c-ac0f-c2ad9278bad-resize-750.jpeg" alt="404" />
            <Link to="/">Back to FFL Home!</Link>
        </div>
    );
}

export default ErrorPage;