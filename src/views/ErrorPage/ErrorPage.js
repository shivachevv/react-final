import React from 'react';
import { Link } from 'react-router-dom';
import styles from './errorpage.module.scss'
import changePageTitle from '../../utils/changePageTitle'
import errorImage from '../../images/404.jpeg'

function ErrorPage(props) {
    changePageTitle("Page not found")

    return (
        <div className={styles.error}>
            <h1>¡Ay, caramba!</h1>
            <img src={errorImage} alt="404" />
            <Link to="/">Back to FFL Home!</Link>
        </div>
    );
}

export default ErrorPage;