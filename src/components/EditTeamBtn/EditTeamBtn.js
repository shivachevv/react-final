import React from 'react';
import { Link } from 'react-router-dom';
import styles from './editteambtn.module.scss'

function EditTeamBtn({id}) {
    return (
        <Link className={styles.link} to={`/edit-team/${id}`}>Set Your Team for next round!</Link>
    );
}

export default EditTeamBtn;