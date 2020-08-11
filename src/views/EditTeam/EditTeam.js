import React from 'react';
import { useParams } from 'react-router-dom'
import styles from './editteam.module.scss'

function EditTeam(props) {
    const id = useParams()

    return (
        <div>
            edit team
        </div>
    );
}

export default EditTeam;