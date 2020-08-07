import React, { Fragment } from 'react';
import styles from './errormsg.module.scss'

function ErrorMsg({ error, msg }) {
    return (
        <Fragment>
            {error ? (<h3 className={styles.error}>{msg}</h3>) : ''}
        </Fragment>
    );
}

export default ErrorMsg;